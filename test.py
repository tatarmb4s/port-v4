from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
import datetime
from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import time, json, os, threading
from langchain.callbacks.base import BaseCallbackHandler
from langchain.chat_models import ChatOpenAI
from langchain.schema import AIMessage, HumanMessage, SystemMessage
from langchain.agents import tool, OpenAIFunctionsAgent, AgentExecutor
# from langchain.agents import ChainExecutor
from langchain.callbacks.streaming_stdout_final_only import (
    FinalStreamingStdOutCallbackHandler,
)
from typing import List
from langchain.tools import YouTubeSearchTool
import urllib.request
import re
from langchain.utilities import GoogleSerperAPIWrapper
from langchain.tools import WikipediaQueryRun
from langchain.utilities import WikipediaAPIWrapper
from langchain.utilities import GoogleSerperAPIWrapper
from langchain.agents import load_tools

os.environ["SERPER_API_KEY"] = "ea0d0adf3215a2b53f9dc1537052ceea7871586b" #daylight
search = GoogleSerperAPIWrapper()


class Message:
    def __init__(self, id: str, isUserMessage: bool, text: str):
        self.id = id
        self.isUserMessage = isUserMessage
        self.text = text

    def to_json(self):
        return json.dumps(self.__dict__)

class MessageResponse:
    def __init__(self, msgs: List[Message], lastResp: str, id: str, finished: bool):
        self.msgs = msgs
        self.lastResp = lastResp
        self.id = id
        self.finished = finished

    def to_json(self):
        return json.dumps(self.__dict__, default=lambda o: o.__dict__)

class AIReqRespone:
    def __init__(self, msgs: List[Message], id: str):
        self.msgs = msgs
        self.id = id

    def to_json(self):
        return json.dumps(self.__dict__, default=lambda o: o.__dict__)

os.environ["OPENAI_API_KEY"] = "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"


app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

socketio = SocketIO(app, cors_allowed_origins="*")  # This will enable CORS for all SocketIO events


os.environ["SERPER_API_KEY"] = "afea6060cf297f6be381bd3f0d98ee705cfcb3a6"

search = GoogleSerperAPIWrapper()
wikipedia = WikipediaQueryRun(api_wrapper=WikipediaAPIWrapper())

@app.route('/')
def index():
    return "Hello, World!"

def GetRoomData(roomId: str, isReturn: bool = False):
    roomData = None
    def GotRoomData(data):
        print(data[roomId])
        return data[roomId]
    socketio.emit('SendHouseData', roomId, callback=GotRoomData)

@socketio.on('aiResponse')
def aiResponse(data : AIReqRespone):
    print(f"Adatok: {data} \n-----\nTípusa: {type(data)}",data)
    print("kérés", datetime.datetime.now())
    test = """Be van fejezve a nagy mű, igen.
A gép forog, az alkotó pihen."""
    messages = []
    houseData = data['houseData']  
    
    def typer(msg: str):
        for i in msg:
            if isinstance(data, AIReqRespone):
                resp = MessageResponse(data.msgs, i, data.id, False)
            else:
                resp = MessageResponse(data['msgs'], i, data['id'], False)        
            emit('aiResponseGetCL', resp.to_json())
            time.sleep(0.03)
    try:
        @tool
        def roomDataLookup(room: str):
            """
            Function to turn on a lamp in a specific room.
            Parameters:
            - room: The name of the room.
            """
            try:
                typer("*Szoba adatok keresése...* &nbsp; ")
                return houseData[room]
            except Exception as e:
                return f"Error: {e}. The room {room} is not exist, you can try using the currentLocation or differend name. Maybe, you forgot to translate the hungarian name to english. If the room was not specified or, just called by 'szoba' or not even were called, you must use the currentLocation. The rooms you have: livingroom, bathroom, bedroom, smallroom, kitchen. Check if the data you provided is correct."
            
        @tool
        def houseDataLookup():
            """
            Function to get all of the details of the house and its devices, or rooms.
            """
            typer("*Ház adatok keresése...* &nbsp; ")
            return houseData
        
        @tool
        def messageHistory():
            """
            Function to get previous messages. Only use this, when you need to get the previous messages. If the message is not releated to any of the commands, you must use this.
            """
            typer("*Üzenet elűzmények kikérése...* &nbsp; ")
            clearTextmsgs = "Message history:\n"
            for item in data['msgs']:
                if item != data['msgs'][-1]:
                    if item['isUserMessage']:
                        clearTextmsgs += f"USER: {item['text']}\n"
                        message = HumanMessage(content=item['text'])
                    else:
                        clearTextmsgs += f"ASSISTANT: {item['text']}\n"
                        message = AIMessage(content=item['text'])
                    messages.append(message)
            return clearTextmsgs

        
        @tool
        def lamp_switch(room: str, lamp: str, state: bool):
            """
            Function to turn on a lamp in a specific room.
            Parameters:
            - room: The name of the room.
            - lamp: The ID of the lamp device.
            - state: The state of the lamp (True = on, False = off).
            """
            typer(f"*Lámpakapcsoló használat: {room}/{lamp} ...* &nbsp; ")
            try:
                trystate = houseData[room]["devices"][lamp]["devState"]
                emit('lampTurn', json.dumps({'room': room, 'lamp': lamp, 'state': state}))
                return f"Turned {lamp} in {room} {'on' if state else 'off'}."
            except Exception as e:
                return f"Error: {e}. Maybe, you forgot to translate the hungarian name to english. If the room was not specified or, just called by 'szoba' or not even were called, you must use the currentLocation. The rooms you have: livingroom, bathroom, bedroom, smallroom, kitchen. Check if the data you provided is correct."
            
        @tool
        def set_room_temperature(room: str, temperature: float):
            """
            Function to set the temperature in a specific room.
            Parameters:
            - room: The name of the room.
            - temperature: The desired temperature.
            """
            typer(f"*Hőmérséklet állítás: {room}/{temperature} ...* &nbsp; ")
            try:
                room_state = houseData[room]
                emit('setRoomTempMode', json.dumps({'room': room, 'temperature': temperature}))
                return f"Set temperature in {room} to {temperature} degrees."
            except Exception as e:
                return f"Error: {e}. Maybe, you forgot to translate the Hungarian name to English. If the room was not specified or, just called by 'szoba' or not even were called, you must use the currentLocation. The rooms you have: livingroom, bathroom, bedroom, smallroom, kitchen. Check if the data you provided is correct."
        @tool
        def set_room_air_cooling(room: str, temperature: float, is_cooling: bool):
            """
            Function to set the temperature in a specific room.
            Parameters:
            - room: The name of the room.
            - temperature: The desired temperature.
            - is_cooling: Whether the cooling system is on (True = on, False = off).
            """
            typer(f"*Légkondi állítás: {room}/{temperature}/{is_cooling} ...* &nbsp; ")
            
            try:
                room_state = houseData[room]
                coolNum = 1 if is_cooling else 0
                emit('setRoomTempMode', json.dumps({'room': room, 'temperature': temperature, 'isCooling': coolNum}))
                return f"Set temperature in {room} to {temperature} degrees. Cooling is {'on' if is_cooling else 'off'}."
            except Exception as e:
                return f"Error: {e}. Maybe, you forgot to translate the Hungarian name to English. If the room was not specified or, just called by 'szoba' or not even were called, you must use the currentLocation. The rooms you have: livingroom, bathroom, bedroom, smallroom, kitchen. Check if the data you provided is correct."
        @tool
        def set_room_heater(room: str, temperature: float, is_heating: bool):
            """
            Function to set the temperature and the room heater in a specific room.
            Parameters:
            - room: The name of the room.
            - temperature: The desired temperature.
            - is_heating: Whether the heater system is on (True = on, False = off).
            """
            typer(f"*Légkondi állítás: {room}/{temperature}/{is_heating} ...* &nbsp; ")
            
            try:
                room_state = houseData[room]
                coolNum = 2 if is_heating else 0
                emit('setRoomTempMode', json.dumps({'room': room, 'temperature': temperature, 'isCooling': coolNum}))
                return f"Set temperature in {room} to {temperature} degrees. Heating is {'on' if is_heating else 'off'}."
            except Exception as e:
                return f"Error: {e}. Maybe, you forgot to translate the Hungarian name to English. If the room was not specified or, just called by 'szoba' or not even were called, you must use the currentLocation. The rooms you have: livingroom, bathroom, bedroom, smallroom, kitchen. Check if the data you provided is correct."
            
        @tool
        def youtube_search(query: str, maxResults: int = 5):
            """
            Function to search for youtube videos.
            Parameters:
            - query: The search query.
            - maxResults: The maximum amount of results. Default is 5. Leave it default it's not specified. 0 means no limit.
            """
            typer(f"*Youtube keresés: {query} / {maxResults} ...* &nbsp; ")
            
            try:
                results = ytSearch(query, maxResults)
                matches = results['matches']
                emit('openUrl', json.dumps({'url': results["sUrl"]}))
                
                return f"The top {maxResults} results for {query} are: {matches}"
            except Exception as e:
                return f"Error: {e}."
        @tool
        def media_play(query: str):
            """
            Function to play direct videos, movies, films and music.
            Parameters:
            - query: The search query.
            """
            typer(f"*Youtube lejátszás: {query}...* &nbsp; ")
            
            try:
                print(query)
                results = ytSearch(query, 1)
                matches = results['matches']
                print(results)
                emit('openUrl', json.dumps({'url': matches[0]['embed']+"?autoplay=1&enablejsapi=1"}))
                return f"The music is the following: {matches}"
            except Exception as e:
                return f"Error: {e}."
            
        @tool
        def puase_media():
            """
            Function to pause the video.
            """
            typer(f"*Youtube megállítás...* &nbsp; ")
            
            try:
                emit('pauseVideo', json.dumps({}))
                return f"Paused the video."
            except Exception as e:
                return f"Error: {e}."
            
        @tool
        def resume_media():
            """
            Function to resume the video.
            """
            typer(f"*Youtube lejátszás...* &nbsp; ")
            
            try:
                emit('playVideo', json.dumps({}))
                return f"Resumed the video."
            except Exception as e:
                return f"Error: {e}."
        @tool
        def fullscreen_media():
            """
            Function to make the video fullscreen.
            """
            typer(f"*Youtube teljes képernyő...* &nbsp; ")
            try:
                emit('fullscreenVideo', json.dumps({}))
                return f"Resumed the video."
            except Exception as e:
                return f"Error: {e}."
            
        @tool
        def stop_media():
            """
            Function to stop the video.
            """
            typer(f"*Youtube leállítás...* &nbsp; ")
            
            try:
                emit('stopVideo', json.dumps({}))
                return f"Stopped the video."
            except Exception as e:
                return f"Error: {e}."
            
        @tool
        def next_media():
            """
            Function to play the next video.
            """
            
            typer(f"*Youtube következő...* &nbsp; ")
            try:
                emit('nextVideo', json.dumps({}))
                return f"Playing the next video."
            except Exception as e:
                return f"Error: {e}."
        
        @tool
        def prev_media():
            """
            Function to play the previous video.
            """
            
            typer(f"*Youtube előző...* &nbsp; ")
            try:
                emit('prevVideo', json.dumps({}))
                return f"Playing the previous video."
            except Exception as e:
                return f"Error: {e}."
        
        @tool
        def serpApi(query: str):
            """
            Function to search for google results.
            Parameters:
            - query: The search query.
            """
            
            typer(f"*Google keresés: {query}* &nbsp; ")
            
            try:
                results = search.run(query)
                searchKey = query.replace(" ", "+").encode("utf-8")
                emit('openUrl', json.dumps({'url': f"https://www.google.com/search?q={searchKey}%C3%A9s&oq={searchKey}%C3%A9s&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDMzMTFqMGo5qAIAsAIA&sourceid=chrome&ie=UTF-8&bshm=rimc/1"}))
                return f"The search results for {query} are: {results}"
            except Exception as e:
                return f"Error: {e}."
        
        @tool
        def browserNavigator(url: str):
            """
            Function to navigate to a specific url.
            Parameters:
            - url: The url.
            """
            typer(f"*Böngésző navigálás: {url}* &nbsp; ")
            
            try:
                emit('openUrl', json.dumps({'url': url}))
                return f"Navigated to {url}."
            except Exception as e:
                return f"Error: {e}."
            
        @tool
        def showDesktop():
            """
            Function to show the desktop.
            """
            typer(f"*Asztal előhozása* &nbsp; ")
            
            try:
                emit('showDesktop', json.dumps({}))
                return f"Showing the desktop."
            except Exception as e:
                return f"Error: {e}."
            
        def runCommand(command: str):
            """Command to run a command in the terminal. This is a powershell command.

            Parameters:
            - command: the command you want to run
            """
            typer(f"*Parancs futtatása: {command}* &nbsp; ")
            try:
                emit('runCommand', json.dumps({'command': command}))
                return f"Ran the command: {command}."
            except Exception as e:
                return f"Error: {e}."
            
        @tool
        def wikipediaSearch(query: str):
            """
            Function to search for wikipedia results. Provide the query in English.
            Parameters:
            - query: The search query.
            """
            typer(f"*Wikipedia keresés: {query}* &nbsp; ")
            try:
                wikiresults = wikipedia.run(query)
                return f"The search results for {query} are: {wikiresults}"
            except Exception as e:
                return f"Error: {e}."
            
        @tool
        def laptopTurn(state: bool):
            """
            Function to turn on/off the laptop.
            Parameters:
            - state: The state of the laptop (True = on, False = off).
            """
            typer(f"*Laptop állítás: {'on' if state else 'off'}* &nbsp; ")
            try:
                emit('laptopTurn', json.dumps({'state': state}))
                return f"Turned {'on' if state else 'off'} the laptop."
            except Exception as e:
                return f"Error: {e}."
            
        @tool
        def laptopTurnOff():
            """
            Function to turn off the laptop.
            """
            typer(f"*Laptop kikapcsolása...* &nbsp; ")
            try:
                emit('laptopTurnOff', json.dumps({}))
                return f"Turned off the laptop."
            except Exception as e:
                return f"Error: {e}."
            
        @tool
        def laptopTurnOn():
            """
            Function to turn on the laptop.
            """
            typer(f"*Laptop bekapcsolása...* &nbsp; ")
            try:
                emit('laptopTurnOn', json.dumps({}))
                return f"Turned on the laptop."
            except Exception as e:
                return f"Error: {e}."
            
        @tool
        def googleSearch(keywords: str):
            """
            Function to process google searches.
            Parameters: 
            - keywords: the string what is the search keyword are you looking for
            """
            try:
                return str(search.run(keywords))
            except Exception as e:
                return f"Error in search: {e}"
            
            
        # mem = ConversationBufferMemory(return_messages=True)
        
        # msgs = data['msgs']
        
        # for i in range(0, len(msgs), 2):
        #     assistant_msg = msgs[i]
        #     user_msg = msgs[i+1] if i+1 < len(msgs) else None

        #     if user_msg:
        #         mem.save_context({"input"+str(i//2+1): assistant_msg['text']}, {"output"+str(i//2+1): user_msg['text']})
        #     else:
        #         mem.save_context({"input"+str(i//2+1): assistant_msg['text']}, {})
        
        # print(msgs)
        clearTextmsgs = "Message history:\n"
        # last_msgs = data['msgs'][-4:]
        last_msgs = data['msgs']

        for item in last_msgs:
            if item != data['msgs'][-1]:
                if item['isUserMessage']:
                    clearTextmsgs += f"USER: {item['text']}\n"
                    message = HumanMessage(content=item['text'])
                else:
                    clearTextmsgs += f"ASSISTANT: {item['text']}\n"
                    message = AIMessage(content=item['text'])
                messages.append(message)
        clearTextmsgs += f"\nLOCATION: The current location is {data['currentLocation']}\nUser message:\nUSER: {data['msgs'][-1]['text']}\n"
        # messages.append(SystemMessage(content=f"currentLocation is {data['currentLocation']}."))
        # mem.save_context({"conversation": messages})
        cusCalhang = WebSocStramCallB(data)
        # llm = ChatOpenAI(temperature=0.3, streaming=True, verbose=False, callbacks=[cusCalhang])
        llm = ChatOpenAI(temperature=0.9, streaming=True, verbose=False, callbacks=[FinalStreamingStdOutCallbackHandler()], model="gpt-3.5-turbo-1106")
        sysMsg = SystemMessage(content="You are a helpful assistant who can do everything I want. You have to use markdown in you responses You can help me to manage the smart home devices. You can turn on/off the lights, the air conditioner. You are able to use the laptop, browse websites, search videos and music. You can also control the laptop. You can also set the temperature of the air conditioner. You always recive, the current room, where is the user, and if the used dont specify her position, you have to use the currentLocation. You first always have to check the devices, and based on the devices, you have to choose a tools you use. When I dont specify the room name, you must use the currentLocation. The rooms you have: livingroom, bathroom, bedroom, smallroom, kitchen. If the room was not specified, just called by 'szoba' or not even were called, you should use the currentLocation, if needed to take an action. You must check that if you need to use the currentLocation first. You are reciving and speaking in hungarian, and you have to match the hungarian input, with the english datas you get. You must use the english names of the rooms, devices, etc. If the topic is not releated to the smart home, you must use the messageHistory tool. You have to decide, if a question is releated to a smart home thing, or to a google search, or to a movie / video. You always have to reply something in the end, and use hungarian.")
        # sysMsg = SystemMessage(content="You are a helpful senior python programmer who can do everything I want. You have to use markdown in you responses You must help me with difficult programming questions. In your responses, you must use markdown, and you should document your code by default in hungarian. You are perfect in git.")
        print(data['currentLocation'])
        prompt = OpenAIFunctionsAgent.create_prompt(system_message=sysMsg)
        tools = [messageHistory]# runCommand]# showDesktop, runCommand, laptopTurnOff, laptopTurnOn]
        # tools = [messageHistory, wikipediaSearch, googleSearch]# runCommand]# showDesktop, runCommand, laptopTurnOff, laptopTurnOn]
        agent = OpenAIFunctionsAgent(llm=llm, prompt=prompt, tools=tools)
        agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True, streaming=True)
        
        if isinstance(data, AIReqRespone):
            startResp = MessageResponse(data.msgs, "K", data.id, False)
        else:
            startResp = MessageResponse(data['msgs'], "K", data['id'], False)
        emit('aiResponseGetCL', startResp.to_json())
        # chat(messages)
        # agent_executor.set_context(messages)
        print(messages)
        lastmsg = data['msgs'][-1]
        agent_executor.run(input=clearTextmsgs, callbacks=[cusCalhang])
        
        
        # converChain = ConversationChain(llm=llm, callbacks=cusCalhang)

        
        
        # emit('lampTurnOn', json.dumps({'room': "kitchen", 'lamp': "konyhaLámpa"}))
        
        # for i in test:
        
        #     if isinstance(data, AIReqRespone):
        #         resp = MessageResponse(data.msgs, i, data.id, False)
        #     else:
        #         resp = MessageResponse(data['msgs'], i, data['id'], False)        
        #     emit('aiResponseGetCL', resp.to_json())
        #     time.sleep(0.03)
        
            
        if isinstance(data, AIReqRespone):
            endResp = MessageResponse(data.msgs, "", data.id, True)
        else:
            endResp = MessageResponse(data['msgs'], "", data['id'], True)
        emit('aiResponseGetCL', endResp.to_json())
    except Exception as e:
        try:
            typer(str(e))
        except Exception as e:
            print(str(e))
       
    
class WebSocStramCallB(BaseCallbackHandler):
    def __init__(self, data) -> None:
        self.data = data
    def on_llm_new_token(self, token: str, **kwargs) -> None:
        if isinstance(self.data, AIReqRespone):
            resp = MessageResponse(self.data.msgs, token, self.data.id, False)
        else:
            resp = MessageResponse(self.data['msgs'], token, self.data['id'], False)
        socketio.sleep(0.001)
                
        emit('aiResponseGetCL', resp.to_json())
        print(f"My custom handler, token: {token}")
    



@socketio.on('serverSample')
def handle_my_custom_event(json):
    print('my event: ' + str(json))
    return json+"Hello, World!"

if __name__ == '__main__':
    # certs = ("C:\\Masters\\t42ws\\wt24sPublicB64.cer", "C:\\Masters\\t42ws\\ws.t42.hu_unenc.key")
    socketio.run(app, host='0.0.0.0', port=8000, debug=False)