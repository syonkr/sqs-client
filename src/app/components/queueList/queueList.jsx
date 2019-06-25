import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import QueueListItem from './queueListItem';
import { getQueues } from '../../actions/queueActions';

class QueueList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q: '',
    };
    this.searchFilterChange = this.searchFilterChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getQueues();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.getQueues(this.state.q);
  }

  searchFilterChange(e) {
    this.setState({ q: e.target.value });
  }

  render() {
    const { queues } = this.props.queue;

    return (
      <Fragment>
        <div className="container-fluid">
          <form onSubmit={this.handleSubmit}>
            <input
              className="form-control"
              type="text"
              placeholder="Search..."
              onChange={this.searchFilterChange}
              value={this.state.q}
            />
            <input type="submit" value="Search" />
          </form>
          <ul className="list-group">
            {queues.map(q => <QueueListItem key={q} queue={q} />)}
          </ul>
          <Link to="/create" className="btn btn-primary btn-block mt-4">Create queue</Link>
        </div>
      </Fragment>
    );
  }
}

QueueList.propTypes = {
  getQueues: PropTypes.func.isRequired,
  queue: PropTypes.shape({
    queue: PropTypes.string,
    queues: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

const mapStateToProps = state => ({
  queue: state.queue,
});

export default connect(mapStateToProps, { getQueues })(QueueList);
