package com.example.oriel.a15puzzle;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;
import java.text.SimpleDateFormat;
import java.util.Date;

import static com.example.oriel.a15puzzle.Game.showGame;

public class Game4x4Activity extends Activity {

    EditText userName;

    SimpleDateFormat mSimpleDateFormat;
    public static String dateFormatted = "";
    public static String userNameparse = "";
    static String parseScore = "";

    DbHelperMediumMode dbHelperMediumMode;
    SQLiteDatabase mSQLiteDatabase;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_4x4);

        Button finishBtn4x4 = findViewById(R.id.finish_btn_4x4);
        ImageButton shuffleBtn4x4 = findViewById(R.id.shuffle_btn_4x4);

        final TextView moves_4x4_tv = findViewById(R.id.moves_4x4_tv);

        userName =  findViewById(R.id.username_txt);
        mSimpleDateFormat = new SimpleDateFormat("MM-dd-yyyy");
        dateFormatted = mSimpleDateFormat.format(new Date());

        Configur.isGamePlaying = false;
        Configur.movesCounter = 0;
        Cube4x4[][] cubes = new Cube4x4[Configur.Lines4x4][Configur.Lines4x4];

        cubes[0][0] = findViewById(R.id.square0_4x4);
        cubes[0][1] = findViewById(R.id.square1_4x4);
        cubes[0][2] = findViewById(R.id.square2_4x4);
        cubes[0][3] = findViewById(R.id.square3_4x4);

        cubes[1][0] = findViewById(R.id.square4_4x4);
        cubes[1][1] = findViewById(R.id.square5_4x4);
        cubes[1][2] = findViewById(R.id.square6_4x4);
        cubes[1][3] = findViewById(R.id.square7_4x4);

        cubes[2][0] = findViewById(R.id.square8_4x4);
        cubes[2][1] = findViewById(R.id.square9_4x4);
        cubes[2][2] = findViewById(R.id.square10_4x4);
        cubes[2][3] = findViewById(R.id.square11_4x4);

        cubes[3][0] = findViewById(R.id.square12_4x4);
        cubes[3][1] = findViewById(R.id.square13_4x4);
        cubes[3][2] = findViewById(R.id.square14_4x4);
        cubes[3][3] = findViewById(R.id.square15_4x4);

        Game.setGame4x4(cubes);
        showGame(4);

        final Handler handler = new Handler(){
            @Override
            public void handleMessage(Message msg) {

                if (msg.what == 1001){
                    moves_4x4_tv.setText(getResources().getString(R.string.moves) + " " +Configur.movesCounter);
                }
                super.handleMessage(msg);
            }
        };


        Thread thread = new Thread(){
            @Override
            public void run() {
                super.run();

                while (true){

                    if (Configur.startGame){
                        Message message = new Message();
                        message.what = 1001;
                        handler.sendMessage(message);
                    }

                    try {
                        Thread.sleep(10);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        };
        thread.start();

        finishBtn4x4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                        if (Configur.isGamePlaying){
                            if (Game.isWin4x4()){

                                MediaPlayer mediaPlayer = MediaPlayer.create(Game4x4Activity.this,R.raw.applause3);
                                mediaPlayer.start();

                                AlertDialog.Builder builder = new AlertDialog.Builder(Game4x4Activity.this);
                                builder.setTitle(getResources().getString(R.string.well_done))
                                        .setMessage(getResources().getString(R.string.won_game) +" " +Configur.movesCounter
                                                +" " + getResources().getString(R.string.with_moves ));
                                View dialogView = getLayoutInflater().inflate(R.layout.winning_dialog,null);
                                final EditText usernameET = dialogView.findViewById(R.id.username_txt);

                                builder.setView(dialogView)
                                        .setPositiveButton(R.string.save_score, new DialogInterface.OnClickListener() {
                                            @Override
                                            public void onClick(DialogInterface dialog, int which) {

                                                userNameparse = usernameET.getText().toString();
                                                parseScore = String.valueOf(Configur.movesCounter);

                                                sendInformationToSQLDatabase();
                                                startActivity(new Intent(Game4x4Activity.this, MediumModeHighScores.class));

                                            }
                                        })
                                        .setNegativeButton(R.string.restart_game, new DialogInterface.OnClickListener() {
                                            @Override
                                            public void onClick(DialogInterface dialog, int which) {

                                                MediaPlayer mediaPlayer = MediaPlayer.create(Game4x4Activity.this, R.raw.card_shuffle);
                                                mediaPlayer.start();

                                                Game.shuffleCubes(4);
                                                dialog.dismiss();
                                            }
                                        })
                                        .show();
                            }
                            else {
                                Toast.makeText(Game4x4Activity.this, getResources().getString(R.string.unfinished_game), Toast.LENGTH_SHORT).show();
                            }
                        }
                        else {
                            Toast.makeText(Game4x4Activity.this, getResources().getString(R.string.please_shuffle_cubes), Toast.LENGTH_SHORT).show();
                        }

            }
        });


        shuffleBtn4x4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                MediaPlayer mediaPlayer = MediaPlayer.create(Game4x4Activity.this, R.raw.card_shuffle);
                mediaPlayer.start();

                Configur.isGamePlaying = true;
                Game.shuffleCubes(4);
            }
        });

    }

    private void sendInformationToSQLDatabase() {

        dbHelperMediumMode = new DbHelperMediumMode(getApplicationContext());
        mSQLiteDatabase = dbHelperMediumMode.getWritableDatabase();
        dbHelperMediumMode.addInformation(userNameparse, parseScore, dateFormatted, mSQLiteDatabase);
        dbHelperMediumMode.close();
    }

}

