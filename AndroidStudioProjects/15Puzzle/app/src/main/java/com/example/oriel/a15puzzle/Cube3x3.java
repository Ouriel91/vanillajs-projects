package com.example.oriel.a15puzzle;

import android.content.Context;
import android.graphics.Color;
import android.util.AttributeSet;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.widget.TextView;

public class Cube3x3 extends TextView implements View.OnClickListener {

    public int cubNum3x3 = 10; //mabye change to 0

    public void setCubNum3x3(int n){

        cubNum3x3 = n;
        this.setText(String.valueOf(cubNum3x3));

        if (cubNum3x3 == 0){

            this.setBackgroundColor(0x00000000);
            this.setTextColor(0x00000000);
        }

        else {

            this.setTextColor(Color.WHITE);

            for (int i = 0; i <Configur.color_red_3x3.length ; i++) {

                if (cubNum3x3 == Configur.color_red_3x3[i]){

                    this.setBackgroundResource(R.drawable.cube_red_background);
                }
            }

            for (int i = 0; i <Configur.color_blue_3x3.length ; i++) {

                if (cubNum3x3 == Configur.color_blue_3x3[i]){

                    this.setBackgroundResource(R.drawable.cube_blue_background);
                }
            }

        }

    }

    public Cube3x3(Context context, AttributeSet attrs) {
        super(context, attrs);

        /*
         * TypedValue - Container for a dynamically typed data value.
           Primarily used with Resources for holding resource values.
         * COMPLEX_UNIT_SP - TYPE_DIMENSION complex unit: Value is a scaled pixel.
         * TYPE_DIMENSION - The data field holds a complex number encoding a dimension value.
           Constant Value: 5 (0x00000005)
         */

        this.setTextSize(TypedValue.COMPLEX_UNIT_SP ,50);
        this.setGravity(Gravity.CENTER);
        setOnClickListener(this);

        if (cubNum3x3 == 0){
            this.setBackgroundColor(Color.WHITE);
        }
    }

    @Override
    public void onClick(View v) {
        Game.playGame3x3(cubNum3x3);
    }
}
