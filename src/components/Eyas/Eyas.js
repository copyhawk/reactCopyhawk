/**
 * React Native Component for Copyhawk
 */
'use strict'

let React   = require('react-native');

let {
  Component,
  Text,
  PropTypes
} = React;

/** ------ Your key goes here - Open Demo Site Key included ------- */
const chKey = "56f41935248da97e7582bc89";

class Eyas extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.getText(this.props.label);
  }

  static propTypes = {
    label: PropTypes.string.isRequired,
    environment: PropTypes.string,
    language: PropTypes.string,
  };

  render() {
    return (
      <Text>
        {this.state.content}
      </Text>
    );
  }

  getDefault(label, isStaging) {
    // Fail fast simple debug - could setup a map with defaults for labels
    let labelToReturn = "[ch-error: missing label="+label+" ";
    if (isStaging)
      labelToReturn += " environment=STAGING"
    labelToReturn += " ]"
    return labelToReturn;
  }

  getText(label) {
    if (!label) {
      return;
    }
    let staging = this.props.environment === 'staging';
    let url = "https://app.copyhawk.co/api/";
    if (staging)
      url += 'p/staging.';
    url += chKey + "/" + label + "?lang=" + (this.props.language || 'en') + "&cache=" + Math.random().toString(36);

    let request = new Request(
      url, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'text/plain'
        })
      });

    fetch(request)
      .then((response) => {
        if (response.status === 404)
          this.setState({content:this.getDefault(label, staging)});
        else
          this.setState({content:response._bodyText});
      })
      .done();
  }
}

module.exports = Eyas;
