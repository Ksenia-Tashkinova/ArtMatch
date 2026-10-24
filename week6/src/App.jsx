import { useState } from 'react'
import './App.css'

// Данные — наш "Single Source of Truth"
const initialItems = [
  {
    id: 1,
    name: 'Закат над морем',
    category: 'Картина',
    description: 'Картина маслом в тёплых тонах',
    material: 'Холст, масло',
    size: '60×80 см',
    price: 12000,
    available: true
  },
  {
    id: 2,
    name: 'Ваза «Весна»',
    category: 'Ваза',
    description: 'Керамическая ваза ручной работы',
    material: 'Керамика',
    size: '30×15 см',
    price: 8500,
    available: true
  },
  {
    id: 3,
    name: 'Скульптура «Мысль»',
    category: 'Скульптура',
    description: 'Бронзовая скульптура',
    material: 'Бронза',
    size: '40×20×20 см',
    price: 25000,
    available: true
  },
  {
    id: 4,
    name: 'Пейзаж «Лесная тропа»',
    category: 'Картина',
    description: 'Акварельный пейзаж',
    material: 'Бумага, акварель',
    size: '40×50 см',
    price: 6000,
    available: true
  },
  {
    id: 5,
    name: 'Чаша «Гармония»',
    category: 'Ваза',
    description: 'Декоративная чаша',
    material: 'Глина',
    size: '25×25 см',
    price: 4500,
    available: true
  },
  {
    id: 6,
    name: 'Бюст «Поэт»',
    category: 'Скульптура',
    description: 'Гипсовый бюст',
    material: 'Гипс',
    size: '35×20×20 см',
    price: 15000,
    available: false
  }
]

function App() {
  const [items] = useState(initialItems)
  const [favorites, setFavorites] = useState([])
  const [view, setView] = useState('catalog')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', ...new Set(items.map(item => item.category))]

  const visibleItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Плавная прокрутка к каталогу
  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const displayItems = view === 'favorites'
    ? visibleItems.filter(item => favorites.includes(item.id))
    : visibleItems

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>ArtMatch</h1>
        <nav>
          <button
            className={view === 'catalog' ? 'active' : ''}
            onClick={() => {
              setView('catalog');
              scrollToCatalog();
            }}
          >
            Каталог
          </button>
          <button
            className={view === 'favorites' ? 'active' : ''}
            onClick={() => setView('favorites')}
          >
            Избранное ({favorites.length})
          </button>
          <button>О проекте</button>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h2>Найдите уникальный предмет искусства для вашего интерьера</h2>
          <p>
            ArtMatch — это платформа для подбора картин, скульптур и авторского
            декора от независимых художников. Фильтруйте по категориям,
            материалам и цене.
          </p>
        </section>

        <section className="search-section">
          <h2>Поиск предметов искусства</h2>
          <label htmlFor="search">Поиск по названию или описанию:</label>
          <input
            id="search"
            type="text"
            placeholder="Введите название или описание..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="filters">
            <label htmlFor="category">Категория:</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'Все категории' : cat}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="catalog-section">
          <h2>
            {view === 'favorites' ? 'Избранные предметы' : 'Каталог предметов искусства'}
          </h2>

          {displayItems.length === 0 ? (
            <p className="empty-state">
              {view === 'favorites'
                ? 'У вас пока нет избранных предметов. Нажмите  на карточке, чтобы добавить.'
                : 'Ничего не найдено. Попробуйте изменить параметры поиска.'}
            </p>
          ) : (
            <div className="catalog-grid">
              {displayItems.map(item => (
                <article key={item.id} className="art-card">
                  <div className="art-image"></div>
                  <h3>{item.name}</h3>
                  <p className="artist">{item.description}</p>
                  <p className="meta">Категория: {item.category}</p>
                  <p className="meta">Материал: {item.material}</p>
                  <p className="meta">Размер: {item.size}</p>
                  <p className="price">{item.price.toLocaleString('ru-RU')} ₽</p>
                  <button
                    className={favorites.includes(item.id) ? 'favorite active' : 'favorite'}
                    onClick={() => toggleFavorite(item.id)}
                  >
                    {favorites.includes(item.id) ? '♥ В избранном' : '♡ Добавить в избранное'}
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>© 2024 ArtMatch. Все права защищены.</p>
        <p>Контакты: <a href="mailto:info@artmatch.ru">info@artmatch.ru</a></p>
      </footer>
    </div>
  )
}

export default App