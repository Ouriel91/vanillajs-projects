package com.example.oriel.a15puzzle;

import android.content.Intent;
import android.media.MediaPlayer;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Toast;


import com.shashank.sony.fancygifdialoglib.FancyGifDialog;
import com.shashank.sony.fancygifdialoglib.FancyGifDialogListener;
import com.yarolegovich.lovelydialog.LovelyStandardDialog;

import life.sabujak.roundedbutton.RoundedButton;


public class NavigateActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.navigate_activity);


        RoundedButton moveToClassicPuzzleBtn  = findViewById(R.id.move_to_classic_puzzle_btn);
        RoundedButton moveToImagePuzzlesBtn  = findViewById(R.id.move_to_image_puzzle_btn);
        RoundedButton moveToHighScoresLevelsBtn  = findViewById(R.id.move_to_high_scores_btn);

        moveToClassicPuzzleBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                setMusic();

                new LovelyStandardDialog(NavigateActivity.this, LovelyStandardDialog.ButtonLayout.HORIZONTAL)

                        .setTopColorRes(R.color.blue_button)
                        .setButtonsColorRes(R.color.blue_button)
                        .setIcon(R.drawable.ic_play_circle_outline_black_24dp)
                        .setTitle(R.string.choose_level)
                        .setMessage(R.string.intoduction_classic)
                        .setPositiveButton(R.string.easy_level, new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                setMusic();
                                Intent intent = new Intent(NavigateActivity.this, Game3x3Activity.class);
                                startActivity(intent);
                            }
                        })
                        .setNegativeButton(R.string.medium_level, new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                setMusic();
                                Intent intent = new Intent(NavigateActivity.this, Game4x4Activity.class);
                                startActivity(intent);
                            }
                        })
                        .setNeutralButton(R.string.hard_level, new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                setMusic();
                                Intent intent = new Intent(NavigateActivity.this, Game5x5Activity.class);
                                startActivity(intent);
                            }
                        })
                        .show();
            }
        });

        moveToImagePuzzlesBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                setMusic();

                new LovelyStandardDialog(NavigateActivity.this, LovelyStandardDialog.ButtonLayout.HORIZONTAL)

                        .setTopColorRes(R.color.green_button)
                        .setButtonsColorRes(R.color.green_button)
                        .setIcon(R.drawable.ic_play_circle_outline_black_24dp)
                        .setTitle(R.string.choose_level)
                        .setMessage(R.string.introduction_image)
                        .setPositiveButton(R.string.easy_level, new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                setMusic();
                                Intent intent = new Intent(NavigateActivity.this, PuzzleImageGame3x3.class);
                                startActivity(intent);
                            }
                        })
                        .setNegativeButton(R.string.medium_level, new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                setMusic();
                                Intent intent = new Intent(NavigateActivity.this, PuzzleImageGame4x4.class);
                                startActivity(intent);
                            }
                        })
                        .setNeutralButton(R.string.hard_level, new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                setMusic();
                                Intent intent = new Intent(NavigateActivity.this, PuzzleImageGame5x5.class);
                                startActivity(intent);
                            }
                        })
                        .show();
            }
        });

        moveToHighScoresLevelsBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                setMusic();

                new LovelyStandardDialog(NavigateActivity.this, LovelyStandardDialog.ButtonLayout.HORIZONTAL)

                        .setTopColorRes(R.color.red_button)
                        .setButtonsColorRes(R.color.red_button)
                        .setIcon(R.drawable.ic_format_list_numbered_black_24dp)
                        .setTitle(R.string.choose_table)
                        .setMessage(R.string.introduction_table)
                        .setPositiveButton(R.string.easy_level, new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {

                                setMusic();

                                Intent intent = new Intent(NavigateActivity.this, EasyModeHighScores.class);
                                startActivity(intent);
                            }
                        })
                        .setNegativeButton(R.string.medium_level, new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                setMusic();
                                Intent intent = new Intent(NavigateActivity.this, MediumModeHighScores.class);
                                startActivity(intent);
                            }
                        })
                        .setNeutralButton(R.string.hard_level, new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                setMusic();
                                Intent intent = new Intent(NavigateActivity.this, HardModeHighScores.class);
                                startActivity(intent);
                            }
                        })
                        .show();
            }
        });

    }

    private void setMusic() {
        MediaPlayer mediaPlayer = MediaPlayer.create(NavigateActivity.this, R.raw.mouse_click);
        mediaPlayer.start();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.additions_menu, menu);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {

        switch (item.getItemId()){

            case R.id.about_btn:
                Toast.makeText(this, getResources().getString(R.string.all_copyrights_reserved), Toast.LENGTH_SHORT).show();
                break;

            case R.id.make_contact_btn:

                String mailSendingTo = "orieloh91@gmail.com";

                Intent intent = new Intent(Intent.ACTION_SEND);
                intent.putExtra(Intent.EXTRA_EMAIL, new String[]{mailSendingTo});
                intent.setType("text/html");
                startActivity(Intent.createChooser(intent , getResources().getString(R.string.send_mail_with)));
                break;
        }

        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onBackPressed() {
        //super.onBackPressed();

        new FancyGifDialog.Builder(this)
                .setTitle(getResources().getString(R.string.exit_from_app))
                .setMessage(getResources().getString(R.string.are_you_sure))
                .setNegativeBtnText(getResources().getString(android.R.string.yes))
                .setPositiveBtnBackground("#FF4081")
                .setPositiveBtnText(getResources().getString(android.R.string.no))
                .setNegativeBtnBackground("#FFA9A7A8")
                .setGifResource(R.drawable.exit)
                .isCancellable(true)
                .OnPositiveClicked(new FancyGifDialogListener() {
                    @Override
                    public void OnClick() {
                        Toast.makeText(NavigateActivity.this,getResources().getString(R.string.yayyy),Toast.LENGTH_SHORT).show();
                    }
                })
                .OnNegativeClicked(new FancyGifDialogListener() {
                    @Override
                    public void OnClick() {
                        finish();
                    }
                })
                .build();
    }
}

