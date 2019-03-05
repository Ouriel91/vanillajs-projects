package com.example.oriel.a15puzzle;

import android.content.Context;
import android.graphics.Color;
import android.util.AttributeSet;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.widget.TextView;

public class Cube5x5 extends TextView implements View.OnClickListener {

    public int cubNum5x5 = 10;

    public void setCubNum5x5(int n){

        cubNum5x5 = n;
        this.setText(String.valueOf(cubNum5x5));

        if (cubNum5x5 == 0){

            this.setBackgroundColor(0x00000000);
            this.setTextColor(0x00000000);
        }

        else {

            this.setTextColor(Color.WHITE);

            for (int i = 0; i <Configur.color_red_5x5.length ; i++) {

                if (cubNum5x5 == Configur.color_red_5x5[i]){

                    this.setBackgroundResource(R.drawable.cube_red_background);
                }
            }

            for (int i = 0; i <Configur.color_blue_5x5.length ; i++) {

                if (cubNum5x5 == Configur.color_blue_5x5[i]){

                    this.setBackgroundResource(R.drawable.cube_blue_background);
                }
            }

            for (int i = 0; i <Configur.color_green_5x5.length ; i++) {

                if (cubNum5x5 == Configur.color_green_5x5[i]){

                    this.setBackgroundResource(R.drawable.cube_green_background);
                }
            }

            for (int i = 0; i <Configur.color_gold_5x5.length ; i++) {

                if (cubNum5x5 == Configur.color_gold_5x5[i]){

                    this.setBackgroundResource(R.drawable.cube_gold_background);
                }
            }

        }

    }

    public Cube5x5(Context context, AttributeSet attrs) {
        super(context, attrs);

        this.setTextSize(TypedValue.COMPLEX_UNIT_SP ,40);
        this.setGravity(Gravity.CENTER);
        setOnClickListener(this);

        if (cubNum5x5 == 0){
            this.setBackgroundColor(Color.WHITE);
        }
    }

    @Override
    public void onClick(View v) {
        Game.playGame5x5(cubNum5x5);
    }
}

