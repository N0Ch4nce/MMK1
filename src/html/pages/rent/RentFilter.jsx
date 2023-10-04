import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RentFilter({ onFilterChange, setCards, cards, cardInfo, brendFilter, setBrendFilter, modelFilter, setModelFilter, capacityFilter, setCapacityFilter, minRadiusFilter, setMinRadiusFilter, maxRadiusFilter, setMaxRadiusFilter, sizesFilter, setSizesFilter, search, setSearch }) {
  const [brends, setBrends] = useState([...new Set(cardInfo.map(card => card.brand))]);
  const [models, setModels] = useState([...new Set(cardInfo.map(card => card.model))]);
  const [capacity, setCapactity] = useState([...new Set(cardInfo.map(card => card.garbage))].sort((a,b)=>a-b));
  const [minRadiuses, setMinRadiuses] = useState([...new Set(cardInfo.map(card => card.minRadius))].sort((a,b)=>a-b));
  const [maxRadiuses, setMaxRadiuses] = useState([...new Set(cardInfo.map(card => card.maxRadius))].sort((a,b)=>a-b));
  const [sizes, setSizes] = useState([...new Set(cardInfo.map(card => card.height))].sort((a,b)=>a-b));
  // const [brendFilter, setBrendFilter] = useState('');
  // const [modelFilter, setModelFilter] = useState('');
  // const [capacityFilter, setCapacityFilter] = useState('');
  // const [minRadiusFilter,setMinRadiusFilter] = useState('') ;
  // const [maxRadiusFilter,setMaxRadiusFilter] = useState('') ;
  // const [sizesFilter,setSizesFilter] = useState('') ;
  // const [search, setSearch] = useState('');

  const [rentFilterActive, setRentFilterActive] = useState(true)
  const [activeBrandFilter, setActiveBrandFilter] = useState(false)
  const [activeModelFilter, setActiveModelFilter] = useState(false)

  const navigate = useNavigate()


  useEffect(() => {
    if (window.innerWidth > 1440) {
      setRentFilterActive(true)
    } else {
      setRentFilterActive(false)
    }
  },[])


  useEffect(() => {
    if (search.length > 0) {
      setCards(state => cardInfo.filter(card => !!card.brand.toLowerCase().match(search.trim().toLowerCase()) || !!card.model.toLowerCase().match(search.trim().toLowerCase())));

    } else {
      setCards(cardInfo);
    }

    if (brendFilter) {
      setCards(state => state.filter(card => card.brand == brendFilter));
      setModels([...new Set(cardInfo.map(card => {
        if (card.brand == brendFilter) {
          return card.model
        }
      }))].filter(card => card && card));
    } else {
      // setModelFilter('');
      setModels([...new Set(cardInfo.map(card => card.model))]);
    }

    if (modelFilter) {
      setCards(state => state.filter(card => card.model == modelFilter));
    }

    if (capacityFilter) {
      setCards(state => state.filter(card => card.garbage == capacityFilter));
    }

    if (minRadiusFilter) {
      setCards(state => state.filter(card => card.minRadius == minRadiusFilter));
    }

    if (maxRadiusFilter) {
      setCards(state => state.filter(card => card.maxRadius == maxRadiusFilter));
    }

    if (sizesFilter) {
      setCards(state => state.filter(card => card.height == sizesFilter));
    }


  }, [search, brendFilter, modelFilter, capacityFilter, minRadiusFilter, maxRadiusFilter, sizesFilter]);

  useEffect(() => {
    // console.log(models,modelFilter)
    if (modelFilter && models?.length && !models.find(model => model == modelFilter)) {
      setModelFilter('');
      setCards(cardInfo);
      // console.log('ALERT');
    }


  }, [models])

  const brandListRef = useRef(null);
  const modelListRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {

      if (
        (brandListRef.current &&
          !brandListRef.current.contains(event.target) &&
          modelListRef.current &&
          !modelListRef.current.contains(event.target) &&
          !event.target.classList.contains('brandButton')&&
          !event.target.classList.contains('modelButton')
        )
      ) {
        console.log('N 1',event.target.classList.contains('brandButton'))
        setActiveBrandFilter(false);
        setActiveModelFilter(false);

      }
      // console.log('TEXTS',event.target.innerText,brendFilter)
      // if(event.target.innerText==modelFilter){
      //   console.log('TEXTS',event.target.innerText,brendFilter)
      //   setBrendFilter('');

      // }

      if (activeBrandFilter && event.target.classList.contains('brandFilterTitle')) {
        console.log('OPEN');
        setActiveBrandFilter(false);
        console.log('N 2')
        return
      }
      if (activeModelFilter && event.target.classList.contains('modelFilterTitle')) {
        console.log('OPEN');
        setActiveBrandFilter(false);
        return
      }

      if (event.target.classList.contains('brandFilterTitle')) {
        setActiveBrandFilter(true);
        setActiveModelFilter(false);
        console.log('N 3')
      }
      if (event.target.classList.contains('modelFilterTitle')) {
        setActiveBrandFilter(false);
        setActiveModelFilter(true);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeBrandFilter, activeModelFilter,brendFilter,modelFilter]);

  // useEffect(() => {
  //   console.log('Active', activeBrandFilter)
  // }, [activeBrandFilter])

  return (<>
    <div className="filterFixedBlock">
      <div className="pageNavigationBlock">
        <div className="pageNav" onClick={() => {
            navigate('/')
        }}>Главная</div>
        <div className="pageNav active">Аренда</div>
      </div>    
      <div className="pageTitle">Аренда</div>
      <div className="filterSearch">        
        <input
          type="text"
          placeholder="Введите запрос"
          name="search"
          value={search}
          onChange={event => setSearch(event.target.value)}
        />
        {/* <button onClick={()=>{}}>Применить фильтр</button> */}
      </div>
      <div className={rentFilterActive === true ? "rentFilterButton active" : "rentFilterButton"} onClick={() => {
        setRentFilterActive(!rentFilterActive)
      }}>
        {rentFilterActive === true ? "Закрыть фильтр" : "Открыть фильтр"}
      </div>
      <div className={rentFilterActive === true ? "filterOptions active" : "filterOptions"}>
        <div className="brandModelBlock">
          <div className={activeBrandFilter ? "brandFilter active" : "brandFilter"}>
            <div className="brandFilterTitle"

            >{brendFilter || 'Бренд'}</div>
            <div className="brandsList" ref={brandListRef}>
              {
                brends.map(el => <div className={brendFilter == el ? 'brandButton active' : 'brandButton'} key={Math.random()} onClick={() => {setBrendFilter(state => state == el ? '' : el)}} value={el}>{el}</div>)
              }
            </div>
          </div>
          <div className={activeModelFilter ? "modelFilter active" : "modelFilter"}>
            <div className="modelFilterTitle"

            >{modelFilter || 'Модель'}</div>
            <div className="modelsList" ref={modelListRef}>
              {
                models.map(el => <div className={modelFilter == el ? 'modelButton active' : 'modelButton'} key={Math.random()} onClick={() => setModelFilter(state => state == el ? '' : el)} value={el}>{el}</div>)
              }
            </div>
          </div>

        </div>



        <div className="garbageBlock">
          <div className='filterBlock'>
            <h4>Грузоподъёмность</h4>
            <div className="rowBlock">
              {
                capacity.map(el => <div className={capacityFilter == el ? 'filterBtns active' : 'filterBtns'} key={Math.random()} onClick={() => setCapacityFilter(state => state == el ? '' : el)} value={el}>{el}</div>)
              }
            </div>
          </div>
        </div>


        <div className="minMaxRadiusBlock">
          <div className='filterBlock minRadiusBlock'>
            <h4>Мин. вылет стрелы</h4>
            <div className="rowBlock">
              {
                minRadiuses.map(el => <div className={minRadiusFilter == el ? 'filterBtns active' : 'filterBtns'} key={Math.random()} onClick={() => setMinRadiusFilter(state => state == el ? '' : el)} value={el}>{el}</div>)
              }
            </div>
          </div>
          <div className='filterBlock maxRadiusBlock'>
            <h4>Макс. вылет стрелы</h4>
            <div className="rowBlock">
              {
                maxRadiuses.map(el => <div className={maxRadiusFilter == el ? 'filterBtns active' : 'filterBtns'} key={Math.random()} onClick={() => setMaxRadiusFilter(state => state == el ? '' : el)} value={el}>{el}</div>)
              }
            </div>
          </div>
        </div>



        <div className='sizesBlock'>
          <div className="filterBlock">
            <h4>Максимальная высота</h4>
            <div className="rowBlock">
              {
                sizes.map(el => <div className={sizesFilter == el ? 'filterBtns active' : 'filterBtns'} key={Math.random()} onClick={() => setSizesFilter(state => state == el ? '' : el)} value={el}>{el}</div>)
              }
            </div>
          </div>
        </div>
        <div className='clearFiltersBtn' onClick={() => {
          setSearch('');
          setBrendFilter('');
          setModelFilter('');
          setCapacityFilter('');
          setCapacityFilter('');
          setSizesFilter('');
          setMinRadiusFilter('');
          setMaxRadiusFilter('');
          setCards(cardInfo);
          console.log(cards);
        }}>сбросить фильтры</div>
      </div>
    </div>
  </>
  );
}