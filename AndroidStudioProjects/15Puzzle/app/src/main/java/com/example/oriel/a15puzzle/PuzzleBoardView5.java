package com.example.oriel.a15puzzle;

import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.view.MotionEvent;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import java.util.Random;

public class PuzzleBoardView5 extends View {

    //some number to shuffle tiles in number times
    public static final int NUM_SHUFFLE_STEPS = 100;
    private PuzzleBoard5 puzzleBoard;
    private Activity activity;
    private Random random = new Random();
    int movesCount = 0;
    TextView movesTV;

    public PuzzleBoardView5(Context context) {
        super(context);
        activity = (Activity) context;
    }

    public void initialize(Bitmap bitmap){

        //getWidth of th view
        int width = getWidth();
        puzzleBoard = new PuzzleBoard5(bitmap, width);
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        if (puzzleBoard != null){
            puzzleBoard.draw(canvas);
        }
    }

    public void shuffle(){
        for (int i = 0; i < NUM_SHUFFLE_STEPS ; i++) {

            if (puzzleBoard != null){

                int size = puzzleBoard.neighbours().size();
                puzzleBoard = puzzleBoard.neighbours().get(random.nextInt(size));
                movesCount = 0;
                invalidate();
            }
        }
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {

        if (puzzleBoard != null){

            movesTV = activity.findViewById(R.id.moves_tv);

            switch (event.getAction()){

                case MotionEvent.ACTION_DOWN:
                    if (puzzleBoard.click(event.getX(), event.getY())) {
                        invalidate();
                        movesCount++;
                        movesTV.setText(getResources().getString(R.string.moves) + movesCount+"");

                        if (Configur.isGamePlaying){
                            if (puzzleBoard.resolved()){

                                PuzzleImageGame5x5.getPuzzleImageGame5x5().winningAlertDialog();
                            }
                        }
                        else {
                            Toast.makeText(activity, getResources().getString(R.string.please_shuffle_cubes), Toast.LENGTH_SHORT).show();
                        }

                        return true;
                    }
            }
        }

        return super.onTouchEvent(event);
    }
}
