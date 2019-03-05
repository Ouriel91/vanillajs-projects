package com.example.oriel.a15puzzle;

import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.ListView;

public class MediumModeHighScores extends AppCompatActivity {

    ListView mListView;
    CustomAdapter mCustomAdapter;

    SQLiteDatabase mSQLiteDatabase;
    DbHelperMediumMode mDbHelper;
    Cursor mCursor;
    Context mContext;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.high_scores_medium_mode);

        mContext = this;

        mListView = findViewById(R.id.list_view_4x4);
        mCustomAdapter = new CustomAdapter(mContext, R.layout.created_row);

        mListView.setAdapter(mCustomAdapter);

        getInformation();

    }

    public void getInformation() {

        mDbHelper = new DbHelperMediumMode(getApplicationContext());
        mSQLiteDatabase = mDbHelper.getReadableDatabase();
        mCursor = mDbHelper.getInformation(mSQLiteDatabase);
        if (mCursor.moveToFirst()) {

            do {

                String userName = mCursor.getString(0);
                int score = mCursor.getInt(1);
                String date = mCursor.getString(2);
                DataProvider dataProvider = new DataProvider(userName, score, date);
                mCustomAdapter.add(dataProvider);


            } while (mCursor.moveToNext());
        }
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();

        Intent intent =new Intent(this, NavigateActivity.class);
        startActivity(intent);
    }
}
