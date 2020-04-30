import React, { Component } from 'react';
import './style.css';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default class CardInfo extends Component{
    render(){
        return(
            <div>
                <Card className="card-wd">
                    <CardActionArea>
                        <CardMedia
                        className="card-media"
                        image={ this.props.imagem }
                        title={ this.props.titlehover }
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                        { this.props.title }
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h2" className="subtitulo">
                        { this.props.subtitle }
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        { this.props.text }
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <a href={ this.props.linkButton1 }>
                            <Button size="small" style={{ color:'#204ac8' }} className="button-card">
                                <img src={ this.props.icon1 } alt={ this.props.altIcon1 } className="icon"/>
                                { this.props.nameButton1 }
                            </Button>
                        </a>
                        <a href={ this.props.linkButton2 }>
                            <Button size="small" style={{ color:'#204ac8' }} className="button-card">
                                <img src={ this.props.icon2 } alt={ this.props.altIcon2 } className="icon"/>
                                { this.props.nameButton2 }
                            </Button>
                        </a>
                    </CardActions>
                </Card>
            </div>
        );
    }
}