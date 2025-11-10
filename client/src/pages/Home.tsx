import Header from '../components/Header

function Home() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <Header />
      
      <div style={{ padding: '30px' }}>
        <h1>Список рецептов</h1>
        <p>Скоро здесь будут карточки</p>
      </div>

    </div>
  )
}

export default Home