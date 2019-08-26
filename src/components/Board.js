import React, { Component } from 'react';
import Axios from 'axios';
import Cell from './Cell'
import Win from './Win'
import Lose from './Lose'

class Board extends Component {
    state = {
        board: [],
        currState: '',
        mines: 0,
        id: null,
        win: false,
        lose: false,
        difficulty: null
    }

    check = (x, y) => {
        console.log(`clicked ${x}, ${y}`)

        Axios.post(`http://minesweeper-api.herokuapp.com/games/${this.state.id}/check`, {
            'row' : x,
            'col' : y
        })
        .then(res => {
            // console.log(res.data)
            this.setState({
                board: res.data.board,
                currState: res.data.state,
                mines: res.data.mines
            })
        })
        .then(() => {
            if(this.state.currState === 'lost') {
                this.setState({
                    lose: true
                })
                console.log('You Lose :c')
            }
            else if (this.state.mines == 0) {
                this.setState({
                    win: true
                })
                console.log('You Win!')
            }
        })
    }

    flag = (x, y) => {
        Axios.post(`http://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`, {
            row : x,
            col : y
        })
        .then(res => {
            // console.log(res.data)
            this.setState({
                board: res.data.board,
                mines: res.data.mines
            })
        })
    }

    newGame = async () => {
        await Axios.post('http://minesweeper-api.herokuapp.com/games', {
            difficulty : 0
        }).then(res => {
            // const diff = window.prompt('Enter difficulty, 0, 1, 2')
            this.setState({
                board: res.data.board,
                currState: res.data.state,
                mines: res.data.mines,
                id: res.data.id,
                // difficulty: diff
            })
            // console.log(this.state)
        })  
             
    }

    async componentDidMount() {
        this.newGame()   
    }

    render() {
        return (
            <>
                <h1 className="title">MINESWEEPER</h1>

                <div>
                    <table className='cell-table'>
                        <tbody>   
                            {this.state.board.map((col, i) => {
                                return (
                                    <tr key={i}>
                                        {col.map((row, j) => {
                                            return (
                                                <Cell
                                                    key={j}
                                                    display={this.state.board[i][j]}
                                                    onClick={() => this.check(i, j)} 
                                                    rightClick={() => this.flag(i, j)}/>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {this.state.win && !this.state.lose && <Win />}
                {this.state.lose && !this.state.win && <Lose />}
                {/* <Win win={this.state.win}/> */}
                {/* <Lose lose={this.state.lose}/> */}
            </> 
            
        );
    }
}

export default Board