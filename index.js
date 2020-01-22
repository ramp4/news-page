
const myNews = [
  {
    id: 1,
    author: 'Саша Печкин',
    text: 'В четверг, четвертого числа...',
    bigText: 'В четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
  },
  {
    id: 2,
    author: 'Просто Вася',
    text: 'Считаю, что $ должен стоить 35 рублей!',
    bigText: 'А евро 42!'
  },
  {
    id: 3,
    author: 'Artem (@RAMP4) Frontend',
    text: 'Junior Developer Summary https://awesome-portfolio.netlify.com/',
    bigText: 'Start a career as a Junior Developer and grow to the next step. Year of software development experience as a web developer Javascript/HTML/CSS. I have experience of working in graphic editors like Photoshop and Figma. I have good analytical skills. I am a fast learner, good team worker.I am currently studying at university.I recently finished JavaScript/Front-end Course The Rolling Scopes School'
  },
  {
    id: 4,
    author: 'Гость',
    text: 'RS School - это бесплатные курсы, проводимые сообществом разработчиков The Rolling Scopes с 2013 года',
    bigText: 'В RS School может учиться каждый, независимо от возраста, профессиональной занятости и места жительства.'
  }
];

class Article extends React.Component {
  state = {
    visible: false,
  }
  handleReadMoreClck = (e) => {
    e.preventDefault()
    this.setState({ visible: true })
  }
  render() {
    const { author, text, bigText } = this.props.data
    const { visible } = this.state
    return (
      <div className='article'>
        <p className='news__author'>{author}:</p>
        <p className='news__text'>{text}</p>
        {
          !visible && <a onClick={this.handleReadMoreClck} href="#" className='news__readmore'>Подробнее</a>
        }
        {
          visible && <p className='news__big-text'>{bigText}</p>
        }
      </div>
    )
  }
}

Article.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    bigText: PropTypes.string.isRequired
  })
}

class News extends React.Component {

  renderNews = () => {
    const { data } = this.props
    let newsTemplate = null

    if (data.length) {
      newsTemplate = data.map(function (item) {
        return <Article key={item.id} data={item} />
      })
    } else {
      newsTemplate = <p>К сожалению новостей нет</p>
    }

    return newsTemplate
  }
  render() {
    const { data } = this.props

    return (
      <div className='news'>
        {this.renderNews()}
        {
          data.length ? <strong className={'news__count'}>Всего новостей: {data.length}</strong> : null
        }
      </div>
    );
  }
}

News.propTypes = {
  data: PropTypes.array.isRequired
}

class Add extends React.Component {
  state = {
    name: '',
    text: '',
    bigText: '',
    agree: false,
  }
  onBtnClickHandler = (e) => {
    e.preventDefault()
    const { name, text, bigText } = this.state
    this.props.onAddNews({
      id: +new Date(),
      author: name,
      text,
      bigText,
    })
  }
  handleChange = (e) => {
    const { id, value } = e.currentTarget
    this.setState({ [id]: e.currentTarget.value })
  }
  handleCheckboxChange = (e) => {
    this.setState({ agree: e.currentTarget.checked })
  }
  validate = () => {
    const { name, text, agree } = this.state
    if (name.trim() && text.trim() && agree) {
      return true
    }
    return false
  }
  render() {
    const { name, text, bigText, agree } = this.state
    return (
      <form className='add'>
        <input
          id='name'
          type='text'
          onChange={this.handleChange}
          className='add__author'
          placeholder='Ваше имя'
          value={name}
        />
        <textarea
          id='text'
          onChange={this.handleChange}
          className='add__text'
          placeholder='Текст новости'
          value={text}
        ></textarea>
        <textarea
          id='bigText'
          onChange={this.handleChange}
          className='add__text'
          placeholder='Текст новости подробно'
          value={bigText}
        ></textarea>
        <label className='add__checkrule'>
          <input type='checkbox' onChange={this.handleCheckboxChange} /> Я согласен с правилами
            </label>
        <button
          className='add__btn'
          onClick={this.onBtnClickHandler}
          disabled={!this.validate()}>
          Добависть новость
            </button>
      </form>
    )
  }
}

Add.propTypes = {
  onAddNews: PropTypes.func.isRequired,
}

class App extends React.Component {
  state = {
    news: myNews,
  }
  handleAddNews = (data) => {
    const nextNews = [data, ...this.state.news]
    this.setState({ news: nextNews })
  }
  render() {
    return (
      <React.Fragment>
        <Add onAddNews={this.handleAddNews} />
        <h3>Новости</h3>
        <News data={this.state.news} />
      </React.Fragment>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
