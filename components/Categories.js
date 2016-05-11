var React = require('react');
var ReactDOM = require('react-dom')


var Categories = React.createClass({

    getInitialState: function(){
        return { focused: 0 }
    },

    clicked: function(index){
        this.setState({ focused : index})
        var title = this.props.categories[index].title
        this.props.selectCategory(title);
    },

    render: function() {

        var categories = this.props.categories;
        var self = this;

        return (
            <div>
                <ul>{categories.map(function(m, index){

                    var style = '';

                    if(self.state.focused == index){
                         style = 'focused';
                    }

                    return <li key={index} className={style} onClick={self.clicked.bind(self, index)}>{m.title}</li>;
                })}</ul>
            </div>
        )
    }
});

module.exports = Categories;
