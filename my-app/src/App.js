import React from 'react'
import { Add } from './components/Add'
import { News } from './components/News'
import './App.css'

class App extends React.Component {
  state = {
    news: null,
    isLoading: false,
  }

  static getDerivedStateFromProps(props, state) {
    let nextFilteredNews

    if (Array.isArray(state.news)) {
      nextFilteredNews = [...state.news]
      nextFilteredNews.forEach((item, index) => {
        if (item.bigText.toLowerCase().indexOf('велосипед') !== -1) {
          item.bigText = 'ВЫ НАРУШИЛИ ПРАВИЛО!'
        }
        if (item.text.toLowerCase().indexOf('велосипед') !== -1) {
          item.text = 'ВЫ НАРУШИЛИ ПРАВИЛО!'
        }
        if (item.author.toLowerCase().indexOf('велосипед') !== -1) {
          item.author = 'ВЫ НАРУШИЛИ ПРАВИЛО!'
        }
      })
    }


    return {
      nextFilteredNews: nextFilteredNews
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    fetch('https://news-page.netlify.com/data/newsData.json')
      .then(response => {
        return response.json()
      })
      .then(data => {
        setTimeout(() => {
          this.setState({ isLoading: false, news: data })
        }, 3000)
      })
  }
  handleAddNews = data => {
    const nextNews = [data, ...this.state.news]
    this.setState({ news: nextNews })
  }
  render() {
    const { news, isLoading } = this.state

    return (
      <React.Fragment>
        <Add onAddNews={this.handleAddNews} />
        <h3>Новости</h3>
        {isLoading && <p>Загружаю...</p>}
        {Array.isArray(news) && <News data={news} />}
      </React.Fragment>
    )
  }
}

export default App