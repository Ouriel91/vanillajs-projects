package com.example.oriel.a15puzzle;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;


public class DbHelperEasyMode extends SQLiteOpenHelper {

    private static final String DATABASE_NAME1 = "score_Table1";
    private static final int DATABASE_VERSION = 1;

    public static final String TABLE_NAME_3X3 = "table_3x3"; // key used to represent the column

    public static final String USER_NAME_3X3 ="user_name_3x3";
    public static final String SCORE_3X3 = "score_3x3";
    public static final String DATE_3X3 = "date_3x3";

    private static final String CREATE_QUERY3X3 = "CREATE TABLE "+ TABLE_NAME_3X3+"("+ USER_NAME_3X3+" TEXT,"
            + SCORE_3X3+" INTEGER,"+ DATE_3X3+" TEXT);"; // pay attention to spacing carefully

    public DbHelperEasyMode(Context context){
        //constructor
        super(context,DATABASE_NAME1,null,DATABASE_VERSION);

    }

    @Override
    public void onCreate(SQLiteDatabase sqLiteDatabase) {

        // create table is only called the first time once the table is created it is not called
        sqLiteDatabase.execSQL(CREATE_QUERY3X3);
    }

    public void addInformation(String name, String score, String Date, SQLiteDatabase db ){

        ContentValues contentValues = new ContentValues();
        contentValues.put(USER_NAME_3X3,name);
        contentValues.put(SCORE_3X3,score);
        contentValues.put(DATE_3X3,Date);

        db.insert(TABLE_NAME_3X3, null , contentValues);
    }


    //Cursor - This interface provides random read-write access
    // to the result set returned by a database query.
    //Cursor is an interface

    public Cursor getInformation(SQLiteDatabase db){

        Cursor cursor;// objects that retrieves information from the database
        String[] projections = {USER_NAME_3X3,SCORE_3X3,DATE_3X3};
        String orderBy = SCORE_3X3+" ASC";

        // the nulls have to do with where clause info
        cursor = db.query(TABLE_NAME_3X3,projections,null,null,null,null,orderBy,null);

        return cursor;
    }


    @Override
    public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {

    }
}


