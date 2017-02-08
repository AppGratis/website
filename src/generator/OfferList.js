import React, { Component } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';

class OfferList extends Component {
  constructor(props) {
    super(props);

    this.offerClicked = this.offerClicked.bind(this);
    this.deleteOffer = this.deleteOffer.bind(this);
    this.offers = props.offers;
  }

  componentWillReceiveProps(nextProps) {
    this.offers = nextProps.offers;
  }

  offerClicked(offerId) {
    this.props.onOfferClicked(offerId);
  }

  deleteOffer(offerToken) {
    this.props.onDeleteOffer(offerToken);
  }

  renderListItem(offer) {
    return (
      <tr key={offer.token}>
        <td>
          {offer.name}
        </td>
        <td>
          <ButtonToolbar>
            <Button bsStyle="link" onClick={() => this.offerClicked(offer)}></Button>
            <Button onClick={() => this.offerClicked(offer)}>Edit</Button>
            <Button bsStyle="danger" onClick={() => this.deleteOffer(offer.token)}>Delete</Button>
          </ButtonToolbar>
        </td>
      </tr>
    )
  }

  render() {
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>Offer name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.offers.map(offer => this.renderListItem(offer))}
            {
              this.offers.length === 0 &&
              <tr>
                <td>
                  No offers
                </td>
              </tr>
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

OfferList.propTypes = {
  offers: React.PropTypes.array.isRequired,
  onOfferClicked: React.PropTypes.func.isRequired,
  onDeleteOffer: React.PropTypes.func.isRequired
}

export default OfferList;
