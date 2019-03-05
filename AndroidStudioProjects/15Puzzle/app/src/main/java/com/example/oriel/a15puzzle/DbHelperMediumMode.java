package com.example.oriel.a15puzzle;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;


public class DbHelperMediumMode extends SQLiteOpenHelper {

    private static final String DATABASE_NAME2 = "score_Table2";
    private static final int DATABASE_VERSION = 2;

    public static final String TABLE_NAME_4X4 = "table_4x4";

    public static final String USER_NAME_4X4 ="user_name_4x4";
    public static final String SCORE_4X4 = "score_4x4";
    public static final String DATE_4X4 = "date_4x4";

    private static final String CREATE_QUERY4X4 = "CREATE TABLE "+ TABLE_NAME_4X4+"("+ USER_NAME_4X4+" TEXT,"
            + SCORE_4X4+" INTEGER,"+ DATE_4X4+" TEXT);";

    public DbHelperMediumMode(Context context){
        super(context,DATABASE_NAME2,null,DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase sqLiteDatabase) {
        sqLiteDatabase.execSQL(CREATE_QUERY4X4);
    }

    public void addInformation(String name, String score, String Date, SQLiteDatabase db ){

        ContentValues contentValues = new ContentValues();
        contentValues.put(USER_NAME_4X4,name);
        contentValues.put(SCORE_4X4,score);
        contentValues.put(DATE_4X4,Date);

        db.insert(TABLE_NAME_4X4, null , contentValues);
    }


    public Cursor getInformation(SQLiteDatabase db){

        Cursor cursor;
        String[] projections = {USER_NAME_4X4,SCORE_4X4,DATE_4X4};
        String orderBy = SCORE_4X4+" ASC";

        cursor = db.query(TABLE_NAME_4X4,projections,null,null,null,null,orderBy,null);

        return cursor;
    }


    @Override
    public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {

    }
}



