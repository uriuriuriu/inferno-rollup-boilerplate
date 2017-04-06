import Inferno from 'inferno'
import Component from 'inferno-component'

class Root extends Component {

  render() {

    const NODE_ENV = 'NODE_ENV'

    return (
      <div>
        <h1>Hello world!</h1>
        <code>Current ENV: {NODE_ENV}</code>
      </div>
    )

  }

}

export default Root