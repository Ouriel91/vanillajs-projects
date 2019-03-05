package com.example.oriel.a15puzzle;

import android.media.MediaPlayer;

public class Configur {

    //Object to whole game
    public static boolean shuffleCubes = false;
    public static boolean startGame = false;
    public static int movesCounter = 0;
    public static boolean isGamePlaying = false;
    public static boolean isMusicPlaying = false;
    public static MediaPlayer mediaPlayer;

    //Object to 3x3 game
    public static int Lines3x3 = 3;
    public static int [] color_red_3x3 = {1,2,3,4,7};
    public static int [] color_blue_3x3 = {5,6,8};
    public static int[][] game3x3Map = new int[][]
            {
            {1,2,3},
            {4,5,6},
            {7,8,0}
            };

    //Object to 5x5 game
    public static int Lines4x4 = 4;
    public static int [] color_red_4x4 = {1,2,3,4,5,9,13};
    public static int [] color_blue_4x4 = {6,7,8,10,14};
    public static int [] color_green_4x4 = {11,12,15};
    public static int[][] game4x4Map = new int[][]
            {
            {1,2,3,4},
            {5,6,7,8},
            {9,10,11,12},
            {13,14,15,0}
            };

    //Object to 5x5 game
    public static int Lines5x5 = 5;
    public static int [] color_red_5x5 = {1,2,3,4,5,6,11,16,21};
    public static int [] color_blue_5x5 = {7,8,9,10,12,17,22};
    public static int [] color_green_5x5 = {13,14,15,18,23};
    public static int [] color_gold_5x5 = {19,20,24};
    public static int[][] game5x5Map = new int[][]
            {
            {1,2,3,4,5},
            {6,7,8,9,10},
            {11,12,13,14,15},
            {16,17,18,19,20},
            {21,22,23,24,0},
            };


}
