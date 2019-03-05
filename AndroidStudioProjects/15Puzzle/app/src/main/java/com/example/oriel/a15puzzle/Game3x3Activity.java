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

public class Game3x3Activity extends Activity {

    //ImageButton musicIB;

    EditText userName;

    SimpleDateFormat mSimpleDateFormat;
    public static String dateFormatted = "";
    public static String userNameparse = "";
    static String parseScore = "";

    DbHelperEasyMode dbHelperEasyMode;
    SQLiteDatabase mSQLiteDatabase;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_3x3);

        Button finishBtn3x3 = findViewById(R.id.finish_btn_3x3);
        ImageButton shuffleBtn3x3 = findViewById(R.id.shuffle_btn_3x3);


        final TextView moves_3x3_tv = findViewById(R.id.moves_3x3_tv);

        userName =  findViewById(R.id.username_txt);
        mSimpleDateFormat = new SimpleDateFormat("MM-dd-yyyy");
        dateFormatted = mSimpleDateFormat.format(new Date());

        Configur.isGamePlaying = false;
        Configur.movesCounter = 0;
        Cube3x3[][] cubes = new Cube3x3[Configur.Lines3x3][Configur.Lines3x3];

        cubes[0][0] = findViewById(R.id.square0_3x3);
        cubes[0][1] = findViewById(R.id.square1_3x3);
        cubes[0][2] = findViewById(R.id.square2_3x3);

        cubes[1][0] = findViewById(R.id.square3_3x3);
        cubes[1][1] = findViewById(R.id.square4_3x3);
        cubes[1][2] = findViewById(R.id.square5_3x3);

        cubes[2][0] = findViewById(R.id.square6_3x3);
        cubes[2][1] = findViewById(R.id.square7_3x3);
        cubes[2][2] = findViewById(R.id.square8_3x3);

        Game.setGame3x3(cubes);
        showGame(3);

        final Handler handler = new Handler(){
            @Override
            public void handleMessage(Message msg) {

                /* User-defined message code so that the recipient can
                 * identify what this message is about.
                 */

                if (msg.what == 1000){
                    moves_3x3_tv.setText(getResources().getString(R.string.moves) + " " +Configur.movesCounter);
                }

                super.handleMessage(msg);
            }
        };

        /*
         * A Handler allows you to send and process Message
         * and Runnable objects associated with a thread's MessageQueue.
         * Each Handler instance is associated with a single thread and that thread's message queue.
         * When you create a new Handler, it is bound to the thread / message queue of the thread
         * that is creating it -- from that point on, it will deliver messages and runnables to that
         * message queue and execute them as they come out of the message queue.
         * */

        Thread thread = new Thread(){
            @Override
            public void run() {
                super.run();

                while (true){

                    if (Configur.startGame){
                        Message message = new Message();
                        message.what = 1000;
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

        finishBtn3x3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                        if (Configur.isGamePlaying){
                            if (Game.isWin3x3()){

                                MediaPlayer mediaPlayer = MediaPlayer.create(Game3x3Activity.this,R.raw.applause3);
                                mediaPlayer.start();

                                AlertDialog.Builder builder = new AlertDialog.Builder(Game3x3Activity.this);
                                builder.setTitle(getResources().getString(R.string.well_done))
                                        .setMessage(getResources().getString(R.string.won_game) +" " +Configur.movesCounter
                                                +" " + getResources().getString(R.string.with_moves ));
                                View dialogView = getLayoutInflater().inflate(R.layout.winning_dialog,null);
                                final EditText usernameET = dialogView.findViewById(R.id.username_txt);

                                builder.setView(dialogView)
                                        .setNeutralButton(R.string.save_score, new DialogInterface.OnClickListener() {
                                            @Override
                                            public void onClick(DialogInterface dialog, int which) {

                                                userNameparse = usernameET.getText().toString();
                                                parseScore = String.valueOf(Configur.movesCounter);

                                                sendInformationToSQLDatabase();
                                                startActivity(new Intent(Game3x3Activity.this, EasyModeHighScores.class));

                                            }
                                        })
                                        .setNegativeButton(R.string.restart_game, new DialogInterface.OnClickListener() {
                                            @Override
                                            public void onClick(DialogInterface dialog, int which) {
                                                MediaPlayer mediaPlayer = MediaPlayer.create(Game3x3Activity.this, R.raw.card_shuffle);
                                                mediaPlayer.start();

                                                Game.shuffleCubes(3);
                                                dialog.dismiss();
                                            }
                                        })
                                        .show();
                            }
                            else {
                                Toast.makeText(Game3x3Activity.this,
                                        getResources().getString(R.string.unfinished_game), Toast.LENGTH_SHORT).show();
                            }
                        }else {
                            Toast.makeText(Game3x3Activity.this, getResources().getString(R.string.please_shuffle_cubes), Toast.LENGTH_SHORT).show();
                        }
            }
        });

        shuffleBtn3x3.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {

                MediaPlayer mediaPlayer = MediaPlayer.create(Game3x3Activity.this, R.raw.card_shuffle);
                mediaPlayer.start();

                Configur.isGamePlaying = true;
                Game.shuffleCubes(3);
            }
        });



    }


    private void sendInformationToSQLDatabase(){

        dbHelperEasyMode = new DbHelperEasyMode(getApplicationContext());
        mSQLiteDatabase = dbHelperEasyMode.getWritableDatabase();
        dbHelperEasyMode.addInformation(userNameparse, parseScore, dateFormatted, mSQLiteDatabase);
        dbHelperEasyMode.close();

    }

}
