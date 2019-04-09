import _ from 'lodash'
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import YTSearch from 'youtube-api-search';

const API_KEY = 'AIzaSyD-Tbomtpy5mUaMqvq8yDqFLonMjbHncnM';

// Create a new Component. This component should produce some HTML
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
	render() {
		const videoSearch = _.debounce((term) => this.videoSearch(term), 300);
		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch}/>
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList 
					onVideoSelect={selectedVideo => this.setState({selectedVideo})}
					videos={this.state.videos} />
			</div>
		);
	}
};

// Take this component's generated HTML and put it on the page (in the DOM)
ReactDom.render(<App/>, document.querySelector('.container'));