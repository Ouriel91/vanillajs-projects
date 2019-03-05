package com.example.oriel.a15puzzle;



import java.util.Random;

public class Game {

    //set cubes by level
    static Cube3x3[][] cubes3x3 = new Cube3x3[Configur.Lines3x3][Configur.Lines3x3];
    static Cube4x4[][] cubes4x4= new Cube4x4[Configur.Lines4x4][Configur.Lines4x4];
    static Cube5x5[][] cubes5x5= new Cube5x5[Configur.Lines5x5][Configur.Lines5x5];

    //set game by cubes (by each level)
    public static void setGame3x3(Cube3x3[][] cubes) {
        cubes3x3 = cubes;
    }

    public static void setGame4x4(Cube4x4[][] cubes) {
        cubes4x4 = cubes;
    }

    public static void setGame5x5(Cube5x5[][] cubes) {
        cubes5x5 = cubes;
    }


    //show game of each level by board game
    public static void showGame(int id){

        int[][] gameMap = new int[0][];
        int lines = 0;

        if (id == 3){
            lines = Configur.Lines3x3;
            gameMap = Configur.game3x3Map;

            for (int i = 0; i <lines ; i++) {
                for (int j = 0; j <lines ; j++) {
                    cubes3x3[i][j].setCubNum3x3(gameMap[i][j]);
                }
            }
        }

        else if (id == 4){
            lines = Configur.Lines4x4;
            gameMap = Configur.game4x4Map;

            for (int i = 0; i <lines ; i++) {
                for (int j = 0; j <lines ; j++) {
                    cubes4x4[i][j].setCubNum4x4(gameMap[i][j]);
                }
            }
        }

        else if (id == 5){
            lines = Configur.Lines5x5;
            gameMap = Configur.game5x5Map;

            for (int i = 0; i <lines ; i++) {
                for (int j = 0; j <lines ; j++) {
                    cubes5x5[i][j].setCubNum5x5(gameMap[i][j]);
                }
            }
        }

    }

    //game logic of each level, each level has different logic
    public static void playGame3x3(int cubNum){

        beginGame();
        boardCalculate(3 , cubNum);
        showGame(3);

        if (Game.isWin3x3()){
            Configur.startGame = false;

        }

    }


    public static void playGame4x4(int cubNum){

        beginGame();
        boardCalculate(4 , cubNum);
        showGame(4);

        if (Game.isWin4x4()){
            Configur.startGame = false;
        }

    }

    public static void playGame5x5(int cubNum){

        beginGame();
        boardCalculate(5 , cubNum);
        showGame(5);

        if (Game.isWin5x5()){
            Configur.startGame = false;
        }

    }

    //check if the user finish the game of each level
    public static boolean isWin3x3(){

        if (Configur.game3x3Map[0][0] != 1)
            return false;
        if (Configur.game3x3Map[0][1] != 2)
            return false;
        if (Configur.game3x3Map[0][2] != 3)
            return false;

        if (Configur.game3x3Map[1][0] != 4)
            return false;
        if (Configur.game3x3Map[1][1] != 5)
            return false;
        if (Configur.game3x3Map[1][2] != 6)
            return false;

        if (Configur.game3x3Map[2][0] != 7)
            return false;
        if (Configur.game3x3Map[2][1] != 8)
            return false;
        if (Configur.game3x3Map[2][2] != 0)
            return false;

        return true;
    }

    public static boolean isWin4x4(){

        if (Configur.game4x4Map[0][0] != 1)
            return false;
        if (Configur.game4x4Map[0][1] != 2)
            return false;
        if (Configur.game4x4Map[0][2] != 3)
            return false;
        if (Configur.game4x4Map[0][3] != 4)
            return false;

        if (Configur.game4x4Map[1][0] != 5)
            return false;
        if (Configur.game4x4Map[1][1] != 6)
            return false;
        if (Configur.game4x4Map[1][2] != 7)
            return false;
        if (Configur.game4x4Map[1][3] != 8)
            return false;

        if (Configur.game4x4Map[2][0] != 9)
            return false;
        if (Configur.game4x4Map[2][1] != 10)
            return false;
        if (Configur.game4x4Map[2][2] != 11)
            return false;
        if (Configur.game4x4Map[2][3] != 12)
            return false;

        if (Configur.game4x4Map[3][0] != 13)
            return false;
        if (Configur.game4x4Map[3][1] != 14)
            return false;
        if (Configur.game4x4Map[3][2] != 15)
            return false;
        if (Configur.game4x4Map[3][3] != 0)
            return false;

        return true;
    }


    public static boolean isWin5x5(){

        if (Configur.game5x5Map[0][0] != 1)
            return false;
        if (Configur.game5x5Map[0][1] != 2)
            return false;
        if (Configur.game5x5Map[0][2] != 3)
            return false;
        if (Configur.game5x5Map[0][3] != 4)
            return false;
        if (Configur.game5x5Map[0][4] != 5)
            return false;

        if (Configur.game5x5Map[1][0] != 6)
            return false;
        if (Configur.game5x5Map[1][1] != 7)
            return false;
        if (Configur.game5x5Map[1][2] != 8)
            return false;
        if (Configur.game5x5Map[1][3] != 9)
            return false;
        if (Configur.game5x5Map[1][4] != 10)
            return false;

        if (Configur.game5x5Map[2][0] != 11)
            return false;
        if (Configur.game5x5Map[2][1] != 12)
            return false;
        if (Configur.game5x5Map[2][2] != 13)
            return false;
        if (Configur.game5x5Map[2][3] != 14)
            return false;
        if (Configur.game5x5Map[2][4] != 15)
            return false;

        if (Configur.game5x5Map[3][0] != 16)
            return false;
        if (Configur.game5x5Map[3][1] != 17)
            return false;
        if (Configur.game5x5Map[3][2] != 18)
            return false;
        if (Configur.game5x5Map[3][3] != 19)
            return false;
        if (Configur.game5x5Map[3][4] != 20)
            return false;

        if (Configur.game5x5Map[4][0] != 21)
            return false;
        if (Configur.game5x5Map[4][1] != 22)
            return false;
        if (Configur.game5x5Map[4][2] != 23)
            return false;
        if (Configur.game5x5Map[4][3] != 24)
            return false;
        if (Configur.game5x5Map[4][4] != 0)
            return false;

        return true;
    }

    //shuffle cubes with randomize algorithem of each level
    public static void shuffleCubes(int id){

        int[][] gameMap = new int[0][];
        int lines = 0;


        if (id == 3){
            lines = Configur.Lines3x3;
            gameMap = Configur.game3x3Map;
        }
        else if (id == 4){
            lines = Configur.Lines4x4;
            gameMap = Configur.game4x4Map;
        }

        else if (id == 5){
            lines = Configur.Lines5x5;
            gameMap = Configur.game5x5Map;
        }

        //array to randomize
        int[] num = new int[lines * lines];
        Random random = new Random();

        //initial array
        for (int i = 0; i <lines * lines ; i++) {
            num[i] = i;
        }

        //make shuffle to array, start from 8 and down beacuse in the array we need one cell of 0
        for (int i = (lines * lines) - 1; i > 0 ; i--) {

            int rand = random.nextInt(i);
            int temp = num[rand];
            num[rand] = num[i];
            num[i] = temp;
        }

        int sum = 0;

        //calculate the opposite number like 1 is the opposite number in 0 index in randomize array
        for (int i = 0; i < lines * lines; i++) {

            //find the number with 0 in our random array and sum the opposite number of it
            if (num[i] == 0){
                sum += i / lines + (i+1) % lines;
                continue;
            }

            for (int j = 0; j < (lines * lines) - i; j++) {
                if (num[j+i] < num[i])
                    sum++;
            }
        }

        if (sum%2 == 1)
        {
            /* we make shuffle again, make to random numbers and make sure that
             * if whey will be 0 in randomize array in the last cell (like 8 in 3x3 game)
             * they will initialize again to make sure that will not be bound exception
             * in randomize array.
             */

            int rand1 = random.nextInt(lines * lines);
            if (num[rand1] == 0)
                if (++rand1 > (lines * lines)-1)
                    rand1 = 0;

            int rand2 = random.nextInt(lines * lines);

            //also make sure that our to random numbers are equal
            while (rand1 == rand2 || num[rand2] == 0)
                if (++rand1 > (lines * lines)-1)
                    rand2 = 0;

            //make shuffle again
            int temp;
            temp = num[rand1];
            num[rand1] = num[rand2];
            num[rand2] = temp;
        }

        //after shuffling any cube get the shuffled randomize array
        for (int i = 0; i < lines * lines; i++) {
            gameMap[i / lines][i % lines] = num[i];
        }

        /* show the game after shuffling, initial the the game start , moves and mark that
           we shuffled cubes
         */

        if (id == 3)
            showGame(3);
        else if (id == 4)
            showGame(4);
        else if (id == 5)
            showGame(5);

        initializeGame();
    }

    //calculate the map game and moves when player play the game
    private static void boardCalculate(int id, int cubNum) {

        int[][] gameMap = new int[0][];
        int lines = 0, row = 0, col = 0;

        if (id == 3){
            lines = Configur.Lines3x3;
            gameMap = Configur.game3x3Map;
        }
        else if (id == 4){
            lines = Configur.Lines4x4;
            gameMap = Configur.game4x4Map;
        }
        else if (id == 5){
            lines = Configur.Lines5x5;
            gameMap = Configur.game5x5Map;
        }

        /*
         * moving on cubes
         * check if you move to up/down/left/right, when we move to any side by click
         * the cube we move from it gets 0, and the cube move to it gets the previous cube number
         * in any move the counter move grow by 1.
         */

        for (int i = 0; i <lines; i++)
            for (int j = 0; j <lines ; j++)
                if (gameMap[i][j] == cubNum)
                {
                    row = i;
                    col = j;
                }

        if (row-1 >= 0 && gameMap[row-1][col] == 0)
        {
            //move up
            gameMap[row-1][col] = gameMap[row][col];
            gameMap[row][col] = 0;
            Configur.movesCounter++;
        }

        else if (row+1 < lines && gameMap[row+1][col] == 0){

            //move right
            gameMap[row+1][col] = gameMap[row][col];
            gameMap[row][col] = 0;
            Configur.movesCounter++;
        }

        else if (col-1 >= 0 && gameMap[row][col-1] == 0){

            //move left
            gameMap[row][col-1] = gameMap[row][col];
            gameMap[row][col] = 0;
            Configur.movesCounter++;
        }

        else if (col+1 < lines && gameMap[row][col+1] == 0){

            //move right
            gameMap[row][col+1] = gameMap[row][col];
            gameMap[row][col] = 0;
            Configur.movesCounter++;
        }
        else
            return;
    }

    //initial game when the cubes shuffle
    private static void initializeGame() {

        Configur.startGame = false;
        Configur.shuffleCubes = true;
        Configur.movesCounter = 0;

    }


    private static void beginGame() {
        if (Configur.shuffleCubes){
            Configur.shuffleCubes = false;
            Configur.startGame = true;
        }
    }

}
