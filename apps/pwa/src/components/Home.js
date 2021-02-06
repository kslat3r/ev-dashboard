import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import LoadingDialog from './Dialog/Loading';
import ErrorDialog from './Dialog/Error';
import Details from './Details';
import Authorise from './Authorise';

@inject('vehicleStore')
@observer
class Home extends Component {
  constructor (props) {
    super(props);

    this.authorise = this.authorise.bind(this);
  }

  componentDidMount () {
    this.props.vehicleStore.initialise();
    this.props.vehicleStore.fetch();
  }

  authorise() {
    this.props.vehicleStore.authorise();
  }

  render () {
    const {
      vehicleStore: {
        requesting,
        error,
        item
      }
    } = this.props;

    return (
      <React.Fragment>
        {requesting ? (
          <LoadingDialog />
        ) : null}

        {error ? (
          <ErrorDialog
            message={error.message}
          />
        ) : null}

        {!requesting && item ? (
          <Details
            vehicle={item}
          />
        ) : null}

        {!requesting && !item ? (
          <Authorise
            onClick={this.authorise}
          />
        ) : null}
      </React.Fragment>
    )
  }
}

export default Home;
