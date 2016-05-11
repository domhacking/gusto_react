var React = require('react')
var ReactDOM = require('react-dom')

var Categories = require('./Categories')
var Products = require('./Products')

var Cupboard = React.createClass({

    // refactor to have 1 function to load both api
    loadCategoriesData: function() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "https://api.gousto.co.uk/products/v2.0/categories", true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                var str = xhr.responseText;
                var json = JSON.stringify(eval("(" + str + ")"));
                var categoriesObj = JSON.parse(json);
                var categoriesData = categoriesObj.data;
                this.setState({categoriesData: categoriesData});
            } else {
                alert('Request failed.  Returned status of ' + xhr.status);
            }
        }.bind(this);
        xhr.send();
    },

    loadProductsData: function() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "https://api.gousto.co.uk/products/v2.0/products?includes[]=categories&includes[]=attributes&sort=position&image_sizes[]=365&i", true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                var str = xhr.responseText;
                var json = JSON.stringify(eval("(" + str + ")"));
                var productsObj = JSON.parse(json);
                var productsData = productsObj.data;
                this.setState({productsData: productsData});
                // console.log(productsData);
            } else {
                alert('Request failed.  Returned status of ' + xhr.status);
            }
        }.bind(this);
        xhr.send();
    },

    getInitialState: function(){
        return {
            categoriesData: [],
            productsData: [],
            chosenProduct: "Drinks Cabinet"
        };
    },

    componentDidMount: function() {
        this.loadCategoriesData();
        this.loadProductsData();
    },

    selectCategory: function(title){
        this.setState({chosenProduct : title})
    },

    render: function(){

        return(
            <div>
                <div className="cupboard">
                    <div className="catergories--container">
                        <h2 className="catergories--header">Store Cuboard</h2>
                        <Categories categories={this.state.categoriesData}
                                    selectCategory={this.selectCategory} />
                        <Products productSearchItems={this.state.productsData}
                                  chosenProduct={this.state.chosenProduct} />
                    </div>
                </div>
            </div>
        )
    }
})
ReactDOM.render(<Cupboard/>, document.getElementById('app'));

module.exports = Cupboard;
