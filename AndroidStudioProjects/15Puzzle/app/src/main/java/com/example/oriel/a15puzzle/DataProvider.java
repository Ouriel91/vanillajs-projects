package com.example.oriel.a15puzzle;

public class DataProvider {

    private String userName;
    private int score;
    private String date;

    public String getUserName() {
        return userName;
    }

    public int getScore() {
        return score;
    }

    public String getDate() {
        return date;
    }

    public DataProvider(String userName, int score, String date){

        this.userName = userName;
        this.score = score;
        this.date = date;
    }
}