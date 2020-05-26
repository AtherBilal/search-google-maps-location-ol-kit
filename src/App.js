import React from 'react'
import { Map, Popup, Controls, centerAndZoom, LayerStyler, VectorLayer, LayerPanel, LayerPanelPage } from '@bayer/ol-kit'

// import VectorLayer from 'ol/layer/vector'
import VectorSource from 'ol/source/vector'
import Point from 'ol/geom/point';
import olFeature from 'ol/feature'
import olCollection from 'ol/collection'
import Polygon from 'ol/geom/polygon';
import olStyle from 'ol/style/style'
import olStroke from 'ol/style/stroke'
import olFill from 'ol/style/fill'
import olCircleStyle from 'ol/style/circle'
import olPoint from 'ol/geom/point'
import olVectorSource from 'ol/source/vector'
// import olVectorLayer from 'ol/layer/vector'
import LocationSearchInput from './SearchBar/SearchBarAutoComplete'
import SearchIcon from '@material-ui/icons/Search';


import proj from 'ol/proj'
import './App.css'
import { LayerPanelContent } from '@bayer/ol-kit/core/LayerPanel';



class App extends React.Component {
  state = { map: null }

  onMapInit = async map => {
    this.setState({map})
    const source = new olVectorSource({ features: new olCollection() })
    this.vectorLayer = new VectorLayer({ source, title: 'SearchMap' })

    // add the data to the map
    map.addLayer(this.vectorLayer)
    this.goToLocation({x:-90.19940419999999, y:38.6270025})
  }

  goToLocation = async location => {
    console.log('go to location')
    console.log('location string: ' + location)
    const { map } = this.state
    const coords = proj.fromLonLat([location.x, location.y])
    console.log('coords: ' + coords)
    const feature = new olFeature(new olPoint(coords))
    const radius = 15
    const color = 'blue'
    feature.setProperties({title: `Location: ${location.x} ${location.y}` })
    // feature.setStyle(
    //   new olStyle({
    //     image: new olCircleStyle ({
    //       radius,
    //       fill: new olFill({ color }),
    //       stroke: new olStroke({
    //         color,
    //         width: 3
    //       })
    //     })
    //   })
    // )
    // feature.getStyle().getImage().setOpacity(.5)
    this.vectorLayer.getSource().getFeaturesCollection().clear()
    this.vectorLayer.getSource().getFeaturesCollection().push(feature)

    centerAndZoom(map, {...location, zoom: 10})

  }

  render () {
    return (
      <Map onMapInit={this.onMapInit} fullScreen={true}>
        <LocationSearchInput onSearch={this.goToLocation}/>

        <Popup />
        <Controls />
        <LayerPanel>
          <LayerPanelPage tabIcon={<SearchIcon />}>
            <LayerPanelContent>
              <LayerStyler />
            </LayerPanelContent>
          </LayerPanelPage>
        </LayerPanel>
      </Map>
    )
  }
}


export default App;