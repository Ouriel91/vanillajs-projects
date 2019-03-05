package com.example.oriel.a15puzzle;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.graphics.Bitmap;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.annotation.Nullable;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.RelativeLayout;
import android.widget.TextView;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;


public class PuzzleImageGame4x4 extends Activity {

    static final int IMAGE_CAPTURE_REQUEST = 1;
    static final int IMAGE_PICK_REQUEST = 2;
    private Bitmap bitmap = null;
    private PuzzleBoardView4 puzzleBoardView;

    EditText userName;

    SimpleDateFormat mSimpleDateFormat;
    public static String dateFormatted = "";
    public static String userNameparse = "";
    static String parseScore = "";

    DbHelperMediumMode dbHelperMediumMode;
    SQLiteDatabase mSQLiteDatabase;

    Uri uri;
    TextView movesTv;
    int movesCount = 0;

    private static PuzzleImageGame4x4 puzzleImageGame4x4 = null;

    public PuzzleImageGame4x4() {
        puzzleImageGame4x4 = this;
    }

    public static PuzzleImageGame4x4 getPuzzleImageGame4x4() {
        return puzzleImageGame4x4;
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_image_4x4);

        userName =  findViewById(R.id.username_txt);
        mSimpleDateFormat = new SimpleDateFormat("MM-dd-yyyy");
        dateFormatted = mSimpleDateFormat.format(new Date());


        RelativeLayout puzzleContainer = findViewById(R.id.puzzle_container);
        ImageButton photoIB = findViewById(R.id.photo_ib);
        ImageButton shuffleIB = findViewById(R.id.shuffle_ib);
        ImageButton pickImageIB = findViewById(R.id.pick_image_ib);

        puzzleBoardView = new PuzzleBoardView4(this);
        movesTv = findViewById(R.id.moves_tv);
        movesCount = puzzleBoardView.movesCount;
        movesCount = 0;

        puzzleBoardView.setLayoutParams
                (new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.MATCH_PARENT,
                        RelativeLayout.LayoutParams.MATCH_PARENT));

        puzzleContainer.addView(puzzleBoardView);


        photoIB.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Configur.isGamePlaying = false;
                Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                startActivityForResult(intent, IMAGE_CAPTURE_REQUEST);
            }
        });

        pickImageIB.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Configur.isGamePlaying = false;
                Intent intent = new Intent();
                intent.setType("image/*");
                intent.setAction(Intent.ACTION_GET_CONTENT);
                startActivityForResult(intent, IMAGE_PICK_REQUEST);
            }
        });

        shuffleIB.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                MediaPlayer mediaPlayer = MediaPlayer.create(PuzzleImageGame4x4.this, R.raw.card_shuffle);
                mediaPlayer.start();

                Configur.isGamePlaying = true;
                puzzleBoardView.shuffle();
                movesTv.setText(getResources().getString(R.string.moves) + movesCount+"");
            }
        });

    }



    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == IMAGE_CAPTURE_REQUEST && resultCode == RESULT_OK){

            bitmap = (Bitmap) data.getExtras().get("data");
            puzzleBoardView.initialize(bitmap);
            movesTv.setText(getResources().getString(R.string.moves) + movesCount+"");
        }

        else if (requestCode == IMAGE_PICK_REQUEST && resultCode == RESULT_OK){

            uri = data.getData();
            try {
                bitmap = MediaStore.Images.Media.getBitmap(getContentResolver(), uri);
                puzzleBoardView.initialize(bitmap);
                movesTv.setText(getResources().getString(R.string.moves) + movesCount+"");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }



    public void winningAlertDialog(){


        MediaPlayer mediaPlayer = MediaPlayer.create(PuzzleImageGame4x4.this,R.raw.applause3);
        mediaPlayer.start();

        movesCount = puzzleBoardView.movesCount;
        AlertDialog.Builder builder = new AlertDialog.Builder(PuzzleImageGame4x4.this);
        builder.setTitle(getResources().getString(R.string.well_done))
                .setMessage(getResources().getString(R.string.won_game) +" " +movesCount
                        +" " + getResources().getString(R.string.with_moves ));
        View dialogView = getLayoutInflater().inflate(R.layout.winning_dialog,null);
        final EditText usernameET = dialogView.findViewById(R.id.username_txt);

        builder.setView(dialogView)
                .setNeutralButton(R.string.save_score, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {

                        userNameparse = usernameET.getText().toString();
                        parseScore = String.valueOf(movesCount);

                        sendInformationToSQLDatabase();
                        startActivity(new Intent(PuzzleImageGame4x4.this, MediumModeHighScores.class));

                    }
                })
                .setNegativeButton(R.string.restart_game, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {

                        movesCount = 0;
                        puzzleBoardView.shuffle();
                        movesTv.setText(getResources().getString(R.string.moves) + movesCount+"");
                    }
                })
                .show();
    }

    private void sendInformationToSQLDatabase(){

        dbHelperMediumMode = new DbHelperMediumMode(getApplicationContext());
        mSQLiteDatabase = dbHelperMediumMode.getWritableDatabase();
        dbHelperMediumMode.addInformation(userNameparse, parseScore, dateFormatted, mSQLiteDatabase);
        dbHelperMediumMode.close();

    }
}