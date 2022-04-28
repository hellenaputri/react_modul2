import React from 'react';
import Utama from './components/utama';
import {Link} from 'react-router-dom';

class App extends React.Component {
  render(){
    return (
      <div><hr />
        | | <Link to="/">Beranda</Link> | 
        | <Link to="/tentangSaya">Tentang Saya</Link> | 
        | <Link to="/karya">Karya</Link> | 
        | <Link to="/kontak">Kontak</Link> | 
        | <Link to="/gallery">Gallery</Link> |
        | <Link to="/cart">Cart</Link> | 
        | <Link to="/pegawai">Daftar Pegawai</Link>  | |
        <hr />
        <p><Utama /></p>
      </div>
    );
  } 
}

export default App;
