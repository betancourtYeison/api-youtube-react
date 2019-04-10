import _ from 'lodash'
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import YTSearch from 'youtube-api-search';

const API_KEY = 'AIzaSyD-Tbomtpy5mUaMqvq8yDqFLonMjbHncnM';

class App extends Component {

    constructor(props){
		super(props);

		this.state = { 
			videos: [],
			selectedVideo: null,
		};

		this.videoSearch('surfboards');
    }
    
	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({ 
				videos, 
				selectedVideo: videos[0] 
			});
			//this.setState({ videos: videos });
		});
    }
    
    render() {
        const videoSearch = _.debounce((term) => this.videoSearch(term), 300);
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <SearchBar onSearchTermChange={videoSearch}/>
                    <div className="App-container">
                        <VideoDetail video={this.state.selectedVideo} />
                        <VideoList 
                            onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                            videos={this.state.videos} />
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
