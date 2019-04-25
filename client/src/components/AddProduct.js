import React, { Component } from 'react';
import '../assets/W3.css';
import '../assets/style.css';
import Button from 'react-bootstrap/Button';


class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brandID: 0,
            name: '',
            import_price: 0,
            export_price: 0,
            amount: 0,
            url_image: '',
            note: '',
            brands: []
        };
    }
    componentDidMount() {
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `{
                brands {
                  id
                  name
                }
              }`
            }),
        }).then(res => res.json()).then(res => {
            this.setState({
                brands: res.data.brands
            });
        }).catch(err => {
            console.log(err);
        });
    }
    displayBrands() {
        var { brands }= this.state;
        return brands.map(brand => {
            return( <option key={ brand.id } value={brand.id}>{ brand.name }</option> );
        });
    }
    submitForm(e) {
        e.preventDefault();
        //console.log(this.state)
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ 
                query: `mutation AddProduct($brandID: Int!,
                    $name: String!,
                    $import_price: Float!, 
                    $export_price: Float!,
                    $amount: Int!,
                    $url_image: String!,
                    $note: String!){
                    addProduct(brandID:$brandID, 
                        name: $name,
                        import_price:$import_price,
                        export_price:$export_price,
                        amount:$amount,
                        url_image:$url_image,
                        note: $note){
                          id
                    }
                  }`,
                variables: { 
                    brandID: parseInt(this.state.brandID),
                    name: this.state.name,
                    import_price: parseInt(this.state.import_price),
                    export_price: parseInt(this.state.export_price),
                    amount: parseInt(this.state.amount),
                    url_image: this.state.url_image,
                    note: this.state.note,
                }
            })
        }).catch(err => {
            console.log(err);
        });
    }
    render() {
        return (
            <form id="add-product" onSubmit={ this.submitForm.bind(this) } style={{ position: 'inherit', width: 100 + '%' }}>
                <div className="w3-rest w3-card-8" style={{ marginLeft: 23 + '%' }}>
                    <h3 style={{ textAlign: 'center', color: 'blue' }}><strong>ADD NEW PRODUCT</strong></h3>
                    <table width="100%" style={{ paddingLeft: 20 + 'px' }} >
                    <tbody>
                        <tr>
                            <td colSpan="2"><h3 style={{ color: '#ff9800' }}><strong>Information</strong></h3></td>
                        </tr>
                        <tr>
                            <td align="right" width="30%"><span className="chu1">Product name:  </span></td>
                            <td width="70%">
                                <input name="ten" type="text" size="30" onChange={(e) => this.setState({ name: e.target.value })} />
                            </td>
                        </tr>
                        <tr>
                            <td align="right" width="30%"><span className="chu1">Image:  </span></td>
                            <td width="70%">
                                <input name="ten" type="text" size="30" onChange={(e) => this.setState({ url_image: e.target.value })} />
                            </td>
                        </tr>
                        <tr>
                            <td align="right" width="30%"><span className="chu1">Import Price:  </span></td>
                            <td width="70%"><label>$</label>
                                <input name="ban" type="text" size="10" onChange={(e) => this.setState({ import_price: e.target.value })} />
                            </td>
                        </tr>
                        <tr>
                            <td align="right" width="30%"><span className="chu1">Export Price:  </span></td>
                            <td width="70%"><label>$</label>
                                <input name="ban" type="text" size="10" onChange={(e) => this.setState({ export_price: e.target.value })} />
                            </td>
                        </tr>
                        <tr>
                            <td width="30%" align="right" valign="top"><span className="chu1">Description: </span></td>
                            <td width="70%">
                                <textarea name="noidung" cols="40" rows="5" onChange={(e) => this.setState({ note: e.target.value })}></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td align="right" width="30%"><span className="chu1">Amount:  </span></td>
                            <td width="70%">
                                <input name="trongluong" type="text" size="20" onChange={(e) => this.setState({ amount: e.target.value })} />
                            </td>
                        </tr>
                        <tr>
                            <td align="right" width="30%"><span className="chu1">Brand:</span></td>
                            <td width="70%">
                                <select onChange={(e) => this.setState({ brandID: e.target.value })}>
                                    <option>Select Brand</option>
                                    {this.displayBrands()};
                                </select>
                            </td>
                        </tr>
                        <tr>
                        <td align="right" width="30%"></td>
                            <td width="70%">
                                <input type="submit" value="Add" style={{color:'black', backgroundColor:'lightblue'}}></input>
                            </td>
                        </tr>
                        </tbody>
                    </table><br></br><br></br>
                </div>
            </form >
        );
    }
}

export default Banner;
