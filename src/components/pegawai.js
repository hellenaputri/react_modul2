import React, {Component} from 'react';  
import $ from 'jquery';  
import axios from 'axios';  
import { Modal } from "react-bootstrap";

class Pegawai extends Component {  
  
  constructor() {  
    super();  
    this.state = {  
      pegawai: [], // array pegawai untuk menampung data pegawai  
      nip: "",  
      nama: "",  
      alamat: "",  
      action: "",  
      search: "",  
    }  
  }  
  bind = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }
 
  Add = () => {
    // mengosongkan isi variabel nip, nama, dan alamat
    // set action menjadi "insert"
    this.setState({
      isOpen: true,
      nip: "",
      nama: "",
      alamat: "",
      action: "insert"
    });
  }
 
  Edit = (item) => {
    /*
    - mengisikan isi variabel nip, nama, alamat sesuai dengan data yang
    akan diedit
    - set action menjadi "update"
    */
    this.setState({
      isOpen: true,
      nip: item.nip,
      nama: item.nama,
      alamat: item.alamat,
      action: "update"
    });
  }
 
  getPegawai = () => {
    let url = "http://localhost:3001/pegawai";
    // mengakses api untuk mengambil data pegawai
    axios.get(url)
    .then(response => {
      // mengisikan data dari respon API ke array pegawai
      this.setState({pegawai: response.data.pegawai});
    })
    .catch(error => {
      console.log(error);
    });
  }
 
  findPegawai = (event) => {
    let url = "http://localhost:3001/pegawai";
    if (event.keyCode === 13) {
      // menampung data keyword pencarian
      let form = {
        find: this.state.search
      }
      // mengakses api untuk mengambil data pegawai
      // berdasarkan keyword
      axios.post(url, form)
      .then(response => {
        // mengisikan data dari respon API ke array pegawai
        this.setState({pegawai: response.data.pegawai});
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
 
  SavePegawai = (event) => {
    event.preventDefault();
    /* menampung data nip, nama dan alamat dari Form
    ke dalam FormData() untuk dikirim  */
    let url = "";
    if (this.state.action === "insert") {
      url = "http://localhost:3001/pegawai/save"
    } else {
      url = "http://localhost:3001/pegawai/update"
    }
    
 
    let form = {
      nip: this.state.nip,
      nama: this.state.nama,
      alamat: this.state.alamat
    }
 
    // mengirim data ke API untuk disimpan pada database
    axios.post(url, form)
    .then(response => {
      // jika proses simpan berhasil, memanggil data yang terbaru
      this.getPegawai();
    })
    .catch(error => {
      console.log(error);
    });
    // menutup form modal
    this.setState({
      isOpen: false
    })
  }
 
  Drop = (nip) => {
    let url = "http://localhost:3001/pegawai/" + nip;
    // memanggil url API untuk menghapus data pada database
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      axios.delete(url)
      .then(response => {
        // jika proses hapus data berhasil, memanggil data yang terbaru
        this.getPegawai();
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  Close(){
    this.setState({
        isOpen: false
    })
  }
 
  componentDidMount(){
    // method yang pertama kali dipanggil pada saat load page
    this.getPegawai()
  }
    
  render(){  
    return (  
      <div className="m-3 card">  
        <div className="card-header bg-info text-white">Data Pegawai</div>  
        <div className="card-body">  
        <input type="text" className="form-control mb-2" name="search" value={this.state.search}  
          onChange={this.bind} onKeyUp={this.findPegawai} placeholder="Pencarian..." />  
        {/* tampilan tabel pegawai */}  
          <table className="table">  
            <thead>  
              <tr>  
                <th>NIP</th>  
                <th>Nama</th>  
                <th>Alamat</th>  
                <th>Option</th>  
              </tr>  
            </thead>  
            <tbody>  
              {this.state.pegawai.map((item,index) => {  
                return (  
                  <tr key={index}>  
                    <td>{item.nip}</td>  
                    <td>{item.nama}</td>  
                    <td>{item.alamat}</td>  
                    <td>  
                      <button className="btn btn-sm btn-info m-1" data-toggle="modal"  
                      data-target="#modal" onClick={() => this.Edit(item)}>  
                        Edit  
                      </button>  
                      <button className="btn btn-sm btn-danger m-1" onClick={() => this.Drop(item.nip)}>  
                        Hapus  
                      </button>  
                    </td>  
                  </tr>  
                );  
              })}  
            </tbody>  
          </table>  
          <button className="btn btn-success" onClick={this.Add}>  
            Tambah Data  
          </button>  
          {/* modal form pegawai */}  
          <Modal show={this.state.isOpen} onHide={this.closeModal}>  
            <div className="modal-content">  
              <div className="modal-header flex">  
                Form Pegawai  
                <button className="btn btn-danger" onClick={() => this.Close()}>
                    X
                </button>
              </div>  
              <form onSubmit={this.SavePegawai}>  
                <div className="modal-body">  
                  NIP  
                  <input type="number" name="nip" value={this.state.nip} onChange={this.bind}  
                  className="form-control" required />  
                  Nama  
                  <input type="text" name="nama" value={this.state.nama} onChange={this.bind}  
                  className="form-control" required />  
                  Alamat  
                  <input type="text" name="alamat" value={this.state.alamat} onChange={this.bind}  
                  className="form-control" required />  
                </div>  
                <div className="modal-footer">  
                  <button className="btn btn-sm btn-success" type="submit">  
                  Simpan  
                  </button>  
                </div>  
              </form>  
            </div>  
          </Modal>  
        </div>  
      </div>  
    );  
  }  
}  
export default Pegawai; 