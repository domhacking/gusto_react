var React = require('react');
var ReactDOM = require('react-dom')


var Products = React.createClass({

    getInitialState: function(){
        return {
            searchString: '',
            productDescription: null
        };
    },

    handleChange: function(e){
        this.setState({searchString:e.target.value});
    },

    productClicked: function(index){
        var prodDescrip = this.props.productSearchItems[index].description;
        this.setState({productDescription : prodDescrip})
    },

    render: function() {

        var products = this.props.productSearchItems,
            chosenProducts = this.props.chosenProduct;
            self = this;
            searchString = this.state.searchString.trim().toLowerCase();

        if(searchString.length > 0){
            products = products.filter(function(l){
                return l.title.toLowerCase().match( searchString );
            });
        }

        return (
            <div>
                <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Search Products" />

                <ul>
                    {products.map(function(l, index){
                        if(chosenProducts == products[index].categories[0].title){
                            return <li key={index} onClick={self.productClicked.bind(self, index)}>{l.title}</li>
                        }
                        <p>DESCRIPTION: {this.state.productDescription}</p>
                    }) }
                </ul>
            </div>
        )
    }
});

module.exports = Products;
