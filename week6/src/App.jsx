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
    available: true,
    author: 'Иван Петров',
    authorContact: 'ivan.petrov@artmail.ru'
  },
  {
    id: 2,
    name: 'Ваза «Весна»',
    category: 'Ваза',
    description: 'Керамическая ваза ручной работы',
    material: 'Керамика',
    size: '30×15 см',
    price: 8500,
    available: true,
    author: 'Мария Сидорова',
    authorContact: 'maria.sidorova@craft.ru'
  },
  {
    id: 3,
    name: 'Скульптура «Мысль»',
    category: 'Скульптура',
    description: 'Бронзовая скульптура',
    material: 'Бронза',
    size: '40×20×20 см',
    price: 25000,
    available: true,
    author: 'Алексей Иванов',
    authorContact: 'alex.ivanov@sculpture.ru'
  },
  {
    id: 4,
    name: 'Пейзаж «Лесная тропа»',
    category: 'Картина',
    description: 'Акварельный пейзаж',
    material: 'Бумага, акварель',
    size: '40×50 см',
    price: 6000,
    available: true,
    author: 'Елена Козлова',
    authorContact: 'elena.k@watercolor.ru'
  },
  {
    id: 5,
    name: 'Чаша «Гармония»',
    category: 'Ваза',
    description: 'Декоративная чаша',
    material: 'Глина',
    size: '25×25 см',
    price: 4500,
    available: true,
    author: 'Дмитрий Волков',
    authorContact: 'd.volkov@pottery.ru'
  },
  {
    id: 6,
    name: 'Бюст «Поэт»',
    category: 'Скульптура',
    description: 'Гипсовый бюст',
    material: 'Гипс',
    size: '35×20×20 см',
    price: 15000,
    available: false,
    author: 'Ольга Новикова',
    authorContact: 'o.novikova@石膏.ru'
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
          <button
            className={view === 'about' ? 'active' : ''}
            onClick={() => setView('about')}
          >
            О проекте
          </button>
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
        
        {view !== 'about' && (
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
        )}

        {view !== 'about' && (
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
                  <p className="meta">Автор: {item.author}</p>
                  <p className="meta">Контакты: <a href={`mailto:${item.authorContact}`}>{item.authorContact}</a></p>
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
        )}

              {view === 'about' && (
          <section className="about-section" id="about">
            <h2>О проекте ArtMatch</h2>
            <div className="about-content">
              <p>
                <strong>ArtMatch</strong> — это платформа для подбора уникальных предметов 
                искусства и авторского декора от независимых художников.
              </p>
              
              <h3>Наша миссия</h3>
              <p>
                Мы помогаем найти идеальное произведение искусства для вашего интерьера, 
                объединяя покупателей с талантливыми художниками и мастерами со всей страны.
              </p>
              
              <h3>Что мы предлагаем</h3>
              <ul>
                <li>Картины маслом, акварелью и другими техниками</li>
                <li>Керамика и вазы ручной работы</li>
                <li>Скульптуры из бронзы, гипса и других материалов</li>
                <li>Авторский декор для дома и офиса</li>
              </ul>
              
              <h3>Как это работает</h3>
              <ol>
                <li>Используйте поиск и фильтры для нахождения подходящих работ</li>
                <li>Добавляйте понравившиеся предметы в избранное</li>
                <li>Свяжитесь с автором напрямую через указанные контакты</li>
              </ol>
              
              <h3>Контакты</h3>
              <p>
                По всем вопросам обращайтесь: <a href="mailto:info@artmatch.ru">info@artmatch.ru</a>
              </p>
            </div>
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>© 2024 ArtMatch. Все права защищены.</p>
        <p>Контакты: <a href="mailto:info@artmatch.ru">info@artmatch.ru</a></p>
      </footer>
    </div>
  )
}

export default App