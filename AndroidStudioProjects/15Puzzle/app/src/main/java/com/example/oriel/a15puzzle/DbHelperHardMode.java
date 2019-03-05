package com.example.oriel.a15puzzle;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;


public class DbHelperHardMode extends SQLiteOpenHelper {

    private static final String DATABASE_NAME3 = "score_Table3";
    private static final int DATABASE_VERSION = 3;

    public static final String TABLE_NAME_5X5 = "table_5x5";

    public static final String USER_NAME_5X5 ="user_name_5x5";
    public static final String SCORE_5X5 = "score_5x5";
    public static final String DATE_5X5 = "date_5x5";

    private static final String CREATE_QUERY5X5 = "CREATE TABLE "+ TABLE_NAME_5X5+"("+ USER_NAME_5X5+" TEXT,"
            + SCORE_5X5+" INTEGER,"+ DATE_5X5+" TEXT);";

    public DbHelperHardMode(Context context){
        super(context,DATABASE_NAME3,null,DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase sqLiteDatabase) {
        sqLiteDatabase.execSQL(CREATE_QUERY5X5);
    }

    public void addInformation(String name, String score, String Date, SQLiteDatabase db ){

        ContentValues contentValues = new ContentValues();
        contentValues.put(USER_NAME_5X5,name);
        contentValues.put(SCORE_5X5,score);
        contentValues.put(DATE_5X5,Date);

        db.insert(TABLE_NAME_5X5, null , contentValues);
    }


    public Cursor getInformation(SQLiteDatabase db){

        Cursor cursor;
        String[] projections = {USER_NAME_5X5,SCORE_5X5,DATE_5X5};
        String orderBy = SCORE_5X5+" ASC";

        cursor = db.query(TABLE_NAME_5X5,projections,null,null,null,null,orderBy,null);

        return cursor;
    }


    @Override
    public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {

    }
}




