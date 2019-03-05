package com.example.oriel.a15puzzle;

import android.graphics.Bitmap;
import android.graphics.Canvas;

import java.util.ArrayList;

public class PuzzleBoard3 {

    //create board tiles as square, width * height, height = width
    private static final int NUM_TILES = 3;

    //check delta of tiles moving
    private static final int [][] NEIGHBOUR_COORDS = {
            { -1,0 },
            { 1,0 },
            { 0,-1 },
            { 0,1 }
    };

    private ArrayList<PuzzleTile> tiles;
    private PuzzleBoard3 previousBoard;
    private int steps;


    PuzzleBoard3(Bitmap bitmap, int parentWidth){

        //get id as parameter, and put function object here and by the id
        //we know the value of the num tiles
        int tileHeight = parentWidth/ NUM_TILES;
        int tileWidth = tileHeight;
        int tilesCount = 0;

        //Creates a new bitmap, scaled from an existing bitmap, when possible.
        Bitmap scaledBitmap = Bitmap.createScaledBitmap
                (bitmap, parentWidth, parentWidth, true);

        int rows = NUM_TILES;
        int cols = NUM_TILES;

        //initial capacity of tiles arrayList
        tiles = new ArrayList<PuzzleTile>(NUM_TILES * NUM_TILES);

        int yAxis = 0;

        for (int x = 0; x < rows ; x++) {

            int xAxis =0;

            for (int y = 0; y <cols; y++) {

                tiles.add(new PuzzleTile(Bitmap.createBitmap(scaledBitmap,xAxis, yAxis,tileWidth,tileHeight), tilesCount));
                xAxis += tileWidth;
                tilesCount++;
            }

            yAxis += tileHeight;
        }

        //Replaces the element at the specified position in this list with the specified element.
        tiles.set(tiles.size() - 1,null);
        steps = 0;
    }

    PuzzleBoard3(PuzzleBoard3 otherBoard){
        previousBoard = otherBoard;

        //Returns a shallow copy of this ArrayList instance.
        tiles = (ArrayList<PuzzleTile>) otherBoard.tiles.clone();
        steps = otherBoard.steps + 1;
    }


    @Override
    public boolean equals(Object obj) {

        if (obj == null)
            return false;

        return tiles.equals(((PuzzleBoard3)obj).tiles );
    }

    //draw the tiles in tiles arrayList in each position
    public void draw(Canvas canvas){

        if (tiles == null)
            return;

        for (int i = 0; i < NUM_TILES * NUM_TILES; i++) {

            PuzzleTile tile = tiles.get(i);

            if (tile != null){
                tile.draw(canvas,i % NUM_TILES, i / NUM_TILES);
            }
        }
    }

    //check if tile clicked and if it clicked it moves to blank space.
    public boolean click(float x, float y){

        for (int i = 0; i < NUM_TILES * NUM_TILES ; i++) {

            PuzzleTile tile = tiles.get(i);

            if (tile != null){
                if (tile.isClicked(x, y,i % NUM_TILES, i / NUM_TILES)) {
                    return tryMoving(i % NUM_TILES, i / NUM_TILES);
                }
            }
        }

        return false;
    }


    /* in if we check:
     * check in each (1D array) neighbour  2D array where is two optional tiles (make sure that tile
       in array List tiles ranges.) to be blank space (null)
     * and also check which of two blank spaces is null.
     * after that we swap the clicked tile into blank space (null) and black space into clicked tile.
     */

    private boolean tryMoving(int tileX, int tileY) {
        for (int [] delta: NEIGHBOUR_COORDS) {

            int nullX = tileX + delta[0];
            int nullY = tileY + delta[1];

            if (nullX >= 0 && nullX < NUM_TILES && nullY >= 0 && nullY < NUM_TILES
                    && tiles.get(XYtoIndex(nullX, nullY)) == null){
                swapTiles(XYtoIndex(nullX, nullY), XYtoIndex(tileX, tileY));
                return true;
            }
        }
        return false;
    }

    private int XYtoIndex(int x, int y) {
        return x + y * NUM_TILES;
    }

    protected void swapTiles(int i, int j) {

        PuzzleTile temp = tiles.get(i);
        tiles.set(i, tiles.get(j));
        tiles.set(j, temp);
    }

    //helper function to shuffle tiles, the function built as the same idea of tryMoving function
    public ArrayList<PuzzleBoard3> neighbours() {

        ArrayList<PuzzleBoard3> neighbours = new ArrayList<>();

        int nullX = -1;
        int nullY = -1;

        for (int i = 0; i < NUM_TILES * NUM_TILES ; i++) {

            PuzzleTile tile = tiles.get(i);

            if (tile == null){
                nullX = i % NUM_TILES;
                nullY = i / NUM_TILES;
            }
        }

        for (int [] delta: NEIGHBOUR_COORDS) {

            int tileX = nullX + delta[0];
            int tileY = nullY + delta[1];

            if (tileX < NUM_TILES && tileX >= 0 && tileY < NUM_TILES && tileY >= 0){

                PuzzleBoard3 temp = new PuzzleBoard3(this);
                temp.swapTiles(XYtoIndex(tileX, tileY), XYtoIndex(nullX, nullY));
                neighbours.add(temp);
            }
        }

        return neighbours;
    }

    public boolean resolved(){

        //-1 because in the end when we win there will be NUM_TILES * NUM_TILES - 1 tiles ordered
        for (int i = 0; i < NUM_TILES * NUM_TILES - 1 ; i++) {

            PuzzleTile tile = tiles.get(i);

            if (tile == null || tile.getNumber() != i){
                return false;
            }
        }
        return true;
    }
}

