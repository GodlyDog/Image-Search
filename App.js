import './App.css';
import './Google-Api.js';
import {searchImages, searchVideos} from "./Google-Api";
import {
    StyleSheet,
    TextInput,
    FlatList,
    Text,
    ImageBackground,
    Button,
    View,
    TouchableHighlight
} from "react-native";
import {useCallback, useEffect, useState} from 'react'

function App() {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [toSave, setToSave] = useState({});

    const styles = StyleSheet.create({
        textInput: {
            color: "white",
            textAlign: "center",
            paddingBottom: 20
        },
        image: {
            width: 200,
            height: 200
        },
        text: {
            color: "white",
            paddingBottom: 20
        },
        imageButton: {
            color: "transparent"
        }
    });

    function saveToFile() {
        const object = {};
        object[search] = toSave
        const jsonString = JSON.stringify(object);
        setToSave({});
        const file = new Blob([jsonString], {type: 'text/plain'});
        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = "SavedSelections.json";
        document.body.appendChild(element);
        element.click();
    }

    function selectImage(item) {
        console.log(item.link);
        const saveClone = structuredClone(toSave);
        if (saveClone[item.link]) {
            delete saveClone[item.link];
        } else {
            saveClone[item.link] = item.image.contextLink;
        }
        setToSave(saveClone);
        console.log(toSave);
    }

    useEffect(() => {
        if (search !== '') {
            setToSave({});
            searchImages(search).then(function (json) {
                console.log(json.items);
                return json.items;
            }).then(function (ImageItems) {
                let imageResults = ImageItems;
                searchVideos(search).then(function (videos) {
                    const links = [];
                    console.log(videos.items[0])
                    const firstId = videos.items[0].id.videoId;
                    const secondId = videos.items[1].id.videoId;
                    links.push({link: `https://img.youtube.com/vi/${firstId}/default.jpg`, image: {contextLink: firstId}, selected: false})
                    links.push({link: `https://img.youtube.com/vi/${secondId}/default.jpg`, image: {contextLink: firstId}, selected: false})
                    console.log(links);
                    imageResults = imageResults.concat(links);
                    console.log(imageResults);
                    setResults(imageResults);
                })
            })
        }
    }, [search])

    const updateSearch = useCallback(({ nativeEvent: { text, eventCount, target }}) => {
        setSearch(text);
    }, [])

    function ButtonProp(item) {
        return (
            <View {...item} style ={{
                height: 200,
                width: 200,
                borderWidth: 10,
                borderColor: toSave[item.link] ? "blue" : "transparent"
            }}/>
        );
    }

    const gridItem = ({item}) => {
        return <ImageBackground style={styles.image} key={item.image.contextLink} source={{uri: item.link}} resizeMode={'cover'}>
            <TouchableHighlight
                onPress={()=>selectImage(item)}>
                <ButtonProp {...item}/>
            </TouchableHighlight>
        </ImageBackground>
    }


  return (
    <div className="App">
      <header className="App-header">
        <Text style={styles.text}>Search for images!</Text>
          <TextInput textAlign="center" style={styles.textInput} defaultValue={search} onSubmitEditing={updateSearch} placeholder={"Input text here!"}/>
        <div>
            <FlatList
            data={results}
            numColumns={3}
            renderItem={gridItem}
            keyExtractor={(item) => item.link}
            />
        </div>
        <Button title={"Download JSON"} onPress={saveToFile}/>
      </header>
    </div>
  );
}

export default App;
