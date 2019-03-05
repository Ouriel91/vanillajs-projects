package com.example.oriel.a15puzzle;

import android.content.Context;
import android.graphics.Color;
import android.util.AttributeSet;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.widget.TextView;

public class Cube4x4 extends TextView implements View.OnClickListener {

    public int cubNum4x4 = 10;

    public void setCubNum4x4(int n){

        cubNum4x4 = n;
        this.setText(String.valueOf(cubNum4x4));

        if (cubNum4x4 == 0){

            this.setBackgroundColor(0x00000000);
            this.setTextColor(0x00000000);
        }

        else {

            this.setTextColor(Color.WHITE);

            for (int i = 0; i <Configur.color_red_4x4.length ; i++) {

                if (cubNum4x4 == Configur.color_red_4x4[i]){

                    this.setBackgroundResource(R.drawable.cube_red_background);
                }
            }

            for (int i = 0; i <Configur.color_blue_4x4.length ; i++) {

                if (cubNum4x4 == Configur.color_blue_4x4[i]){

                    this.setBackgroundResource(R.drawable.cube_blue_background);
                }
            }

            for (int i = 0; i <Configur.color_green_4x4.length ; i++) {

                if (cubNum4x4 == Configur.color_green_4x4[i]){

                    this.setBackgroundResource(R.drawable.cube_green_background);
                }
            }

        }

    }

    public Cube4x4(Context context, AttributeSet attrs) {
        super(context, attrs);

        this.setTextSize(TypedValue.COMPLEX_UNIT_SP ,30);
        this.setGravity(Gravity.CENTER);
        setOnClickListener(this);

        if (cubNum4x4 == 0){
            this.setBackgroundColor(Color.WHITE);
        }
    }

    @Override
    public void onClick(View v) {
        Game.playGame4x4(cubNum4x4);
    }
}
