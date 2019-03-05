package com.example.oriel.a15puzzle;

import android.graphics.Bitmap;
import android.graphics.Canvas;

public class PuzzleTile {

    private Bitmap bitmap;
    private int number;

    //gets in constructor a bitmap and number in tiles arrayList
    public PuzzleTile(Bitmap bitmap, int number){

        this.bitmap = bitmap;
        this.number = number;

    }

    public int getNumber() {
        return number;
    }

    //draw bitmap from top left by arrayList in puzzleBoard class
    public void draw(Canvas canvas , int x, int y){

        canvas.drawBitmap(bitmap, x * bitmap.getWidth(), y * bitmap.getHeight() , null );
    }

    /*
     * pass on the each tile and check if it's clicked
     * tile x0 and y0 is tiles in place and tile x1 and y1 is the delta tiles
     * check if the tile are in range of x and and their delta.
     */
    public boolean isClicked (float clickX, float clickY, int tileX, int tileY){

        int tileX0 = tileX * bitmap.getWidth();
        int tileY0 = tileY * bitmap.getWidth();
        int tileX1 = (tileX + 1) * bitmap.getWidth();
        int tileY1 = (tileY + 1) * bitmap.getWidth();

        return (clickX >= tileX0) && (clickX < tileX1) && (clickY >= tileY0) && (clickY < tileY1);
    }
}

