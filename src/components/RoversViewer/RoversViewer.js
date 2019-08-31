import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import SelectSol from '../SelectSol';
import RoverPhotos from '../RoverPhotos';
import styles from './RoversViewer.module.css';
import {
  getSelectedSol,
  getMinSol,
  getMaxSol,
  getRoverPhotos,
  changeSol,
  fetchPhotosRequest,
  getRovers
} from 'modules/RoverPhotos';
import { connect } from 'react-redux';

class RoverViewer extends PureComponent {
  componentDidMount() {
    this.requestPhotosHandler();
  }

  requestPhotosHandler = () => {
    const { rovers, selectedSol, fetchPhotosRequest } = this.props;

    rovers.forEach(rover => {
      fetchPhotosRequest({ name: rover, sol: selectedSol });
    });
  };

  handleChange = value => {
    const { changeSol } = this.props;

    changeSol(value);
    this.requestPhotosHandler();
  };

  render() {
    const { roverPhotos, minSol, maxSol, selectedSol, rovers } = this.props;

    return (
      <div className={styles.root}>
        <SelectSol
          selectedSol={selectedSol}
          minSol={minSol}
          maxSol={maxSol}
          changeSol={this.handleChange}
        />
        <Grid container alignItems="flex-start" justify="space-between">
          {rovers.map(rover => (
            <RoverPhotos
              key={rover}
              name={rover}
              photos={roverPhotos(rover, selectedSol)}
            />
          ))}
        </Grid>
      </div>
    );
  }
}

export default connect(
  state => ({
    selectedSol: getSelectedSol(state),
    minSol: getMinSol(state),
    maxSol: getMaxSol(state),
    roverPhotos: (rover, sol) => getRoverPhotos(state, rover, sol),
    rovers: getRovers()
  }),
  { changeSol, fetchPhotosRequest }
)(RoverViewer);

// Здесь вам нужно реализовать вью

// Подключите его к редакс роутеру
// Вам потребуются селекторы для получения выбранного сола
// и списка фотографий

// Так же вы будете диспатчить экшены CHANGE_SOL и FETCH_PHOTOS_REQUEST
// Эти экшены находятся в модуле ROVER PHOTOS
