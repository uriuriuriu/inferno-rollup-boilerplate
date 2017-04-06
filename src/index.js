import Inferno from 'inferno'
import Root from './root'

import './styles/style.scss'

const rootEl = document.getElementById('root')

Inferno.render(<Root/>, rootEl)
