import React from 'react'
import { render } from 'react-dom'
import AppRouter from './routers/AppRouters'
import fontawesome from '@fortawesome/fontawesome'
import {
  faTimes,
  faEllipsisH,
  faBars,
  faSearch,
  faBell,
  faCaretDown,
  faAngleLeft,
  faAngleDown,
  faAngleRight,
  faArrowLeft,
  faPlus,
  faDollarSign,
  faShoppingCart,
  faSlidersH,
  faSitemap,
  faEraser,
  faTrash
} from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(
  faTimes,
  faEllipsisH,
  faBars,
  faSearch,
  faBell,
  faCaretDown,
  faAngleLeft,
  faAngleDown,
  faAngleRight,
  faArrowLeft,
  faPlus,
  faDollarSign,
  faShoppingCart,
  faSlidersH,
  faSitemap,
  faEraser,
  faTrash
)

import './styles/styles.sass'

render(<AppRouter />, document.getElementById('root'))
