import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, TextInput , TouchableOpacity, Button } from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'

class HomeScreen extends React.Component
{
    constructor()
    {
        super();

        this.state = {
            text: '',
            isSearchPressed: false,
            word: '',
            lexicalCategory: '',
            examples: [],
            defination: ''
        }
    }

    getWord = (word) =>
    {
        var searchWord = word;
        var url = "https://rupinwhitehatjr.github.io/dictionary/" + searchWord + ".json";

        return fetch(url)
        .then((data) => {
            if(data.status === 200)
            {
                return data.json
            }
            else
            {
                return null
            }
        })
        .then((response) => {
            var responseObject = response

            if(responseObject !== null)
            {
                var wordData = responseObject.definition[0]
                var definition = wordData.description
                var lexCat = wordData.wordType

                this.setState({
                    "text": this.state.text,
                    "definition": definition,
                    "lexicalCategory": lexCat
                })
            }
            else
            {
                this.setState({
                    "text": this.state.text,
                    "definition": 'Not There in dtabase',
                })
            }
        })
    }

    render()
    {
        return(
            <SafeAreaProvider>
                <SafeAreaView>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Dictionary App</Text>
                    </View>
                    <TextInput 
                        onChangeText = {text => 
                        {
                            this.setState({
                                text: text,
                                word: "Loading...."
                            })
                        }}

                        value = {this.state.text}
                        style = {styles.textBox}
                    />
                    <View style={styles.buttonContainer}>
                        <Button title={'Search'} color={'blue'} onPress={
                            () => {
                                this.setState({isSearchPressed: true})
                                this.getWord(this.state.text);                            
                            }
                        }></Button>
                    </View>

                    <Text>Word: {this.state.text}</Text>
                    <Text>Type: {this.state.lexicalCategory}</Text>
                    <Text>Definition: {this.state.definition}</Text>
                </SafeAreaView>
            </SafeAreaProvider>
        )
    }
}

const styles = StyleSheet.create({
    textBox : {
        backgroundColor: '#ff0000',
        width: 500,
        height: 50,
        marginLeft: 500,
        marginTop: 200,
    },

    textContainer: {
        backgroundColor: '#FF00A7', 
        justifyContent:'center', 
        alignItems:'center'
    },

    text: {
        fontSize: 20, 
        marginTop: 20, 
        marginBottom: 20
    },

    buttonContainer: {
        marginTop: 50, 
        width: 200, 
        height:50, 
        marginLeft: 650
    }
})

export default HomeScreen;