import Inferno from 'inferno'
import Component from 'inferno-component'

/*eslint-disable quotes */
const CURRENT_NODE_ENV = process.env.NODE_ENV

class Root extends Component {

  render() {

    return (
      <div>
        <h1>Hello world!</h1>
        <code>Current ENV: { CURRENT_NODE_ENV }</code>
      </div>
    )

  }

}

export default Root