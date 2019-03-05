package com.example.oriel.a15puzzle;

import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.ListView;

public class EasyModeHighScores extends AppCompatActivity {

    ListView mListView;
    CustomAdapter mCustomAdapter;

    SQLiteDatabase mSQLiteDatabase;
    DbHelperEasyMode mDbHelper;
    Cursor mCursor;
    Context mContext; // context variable for this activity


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.high_scores_easy_mode);

        mContext = this;// initializing this activity context to use in the Alert Dialog

        mListView = findViewById(R.id.list_view_3x3);
        mCustomAdapter = new CustomAdapter(mContext, R.layout.created_row);

        mListView.setAdapter(mCustomAdapter);

        getInformation();

    }

    public void getInformation() {

        mDbHelper = new DbHelperEasyMode(getApplicationContext());
        mSQLiteDatabase = mDbHelper.getReadableDatabase();
        mCursor = mDbHelper.getInformation(mSQLiteDatabase);
        if (mCursor.moveToFirst()) {// will return true if information is available false if not

            do {

                String userName = mCursor.getString(0);
                int score = mCursor.getInt(1);
                String date = mCursor.getString(2);
                DataProvider dataProvider = new DataProvider(userName, score, date); // sending to dataprovider class to make into objects
                mCustomAdapter.add(dataProvider);// adding objects


            } while (mCursor.moveToNext()); // all information is stored in mCursor
        }
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();

        Intent intent =new Intent(this, NavigateActivity.class);
        startActivity(intent);
    }
}
