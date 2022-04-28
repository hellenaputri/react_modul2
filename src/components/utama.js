import React from 'react';
import {Switch, Route} from 'react-router-dom';

import beranda from './beranda';
import tentangSaya from './tentangSaya';
import karya from './karya';
import kontak from './kontak';
import Pegawai from './pegawai';
import Gallery from '../pages/gallery';
import Cart from '../pages/cart';

const Utama = () => (
    <Switch>
        <Route exact path="/" component={beranda}/>
        <Route path="/tentangSaya" component={tentangSaya}/>
        <Route path="/karya" component={karya}/>
        <Route path="/kontak" component={kontak}/>
        <Route path="/gallery" component={Gallery} />
        <Route path="/cart" component={Cart} />
        <Route path="/pegawai" component={Pegawai} />
    </Switch>
)

export default Utama;
