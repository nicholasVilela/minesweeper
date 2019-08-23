import React, { Component } from 'react'
import Board from './components/Board';
import Win from './components/Win'
import Lose from './components/Lose'
import Axios from 'axios'

class Game
 extends Component {
  state = {
  }

  render() {
    return (
      <>
        <Board />
        {/* <WinLose /> */}
      </>
    )
  }
}

export default Game

