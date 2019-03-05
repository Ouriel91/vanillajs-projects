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
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.RelativeLayout;
import android.widget.TextView;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;


public class PuzzleImageGame3x3 extends Activity {

    static final int IMAGE_CAPTURE_REQUEST = 1;
    static final int IMAGE_PICK_REQUEST = 2;
    private Bitmap bitmap = null;
    private PuzzleBoardView3 puzzleBoardView;

    EditText userName;

    SimpleDateFormat mSimpleDateFormat;
    public static String dateFormatted = "";
    public static String userNameparse = "";
    static String parseScore = "";

    DbHelperEasyMode dbHelperEasyMode;
    SQLiteDatabase mSQLiteDatabase;

    Uri uri;
    TextView movesTv;
    int movesCount = 0;

    private static PuzzleImageGame3x3 puzzleImageGame3x3 = null;

    public PuzzleImageGame3x3() {
        puzzleImageGame3x3 = this;
    }

    public static PuzzleImageGame3x3 getPuzzleImageGame3x3() {
        return puzzleImageGame3x3;
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_image_3x3);

        userName =  findViewById(R.id.username_txt);
        mSimpleDateFormat = new SimpleDateFormat("MM-dd-yyyy");
        dateFormatted = mSimpleDateFormat.format(new Date());


        RelativeLayout puzzleContainer = findViewById(R.id.puzzle_container);
        ImageButton photoIB = findViewById(R.id.photo_ib);
        ImageButton shuffleIB = findViewById(R.id.shuffle_ib);
        ImageButton pickImageIB = findViewById(R.id.pick_image_ib);

        puzzleBoardView = new PuzzleBoardView3(this);
        movesTv = findViewById(R.id.moves_tv);
        movesCount = puzzleBoardView.movesCount;
        movesCount = 0;
        movesTv.setText("Moves: " + movesCount+"");

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

                MediaPlayer mediaPlayer = MediaPlayer.create(PuzzleImageGame3x3.this, R.raw.card_shuffle);
                mediaPlayer.start();

                Configur.isGamePlaying = true;
                puzzleBoardView.shuffle();
                movesTv.setText("Moves: " + movesCount+"");
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


        MediaPlayer mediaPlayer = MediaPlayer.create(PuzzleImageGame3x3.this,R.raw.applause3);
        mediaPlayer.start();

        movesCount = puzzleBoardView.movesCount;
        AlertDialog.Builder builder = new AlertDialog.Builder(PuzzleImageGame3x3.this);
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
                        startActivity(new Intent(PuzzleImageGame3x3.this, EasyModeHighScores.class));

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

        dbHelperEasyMode = new DbHelperEasyMode(getApplicationContext());
        mSQLiteDatabase = dbHelperEasyMode.getWritableDatabase();
        dbHelperEasyMode.addInformation(userNameparse, parseScore, dateFormatted, mSQLiteDatabase);
        dbHelperEasyMode.close();

    }
}
