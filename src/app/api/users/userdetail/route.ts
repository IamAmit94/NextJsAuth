import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest){

    try {
        const excludedFields = "-password -isVerfied -isAdmin -verifyToken -verifyTokenExpiry -__v";
        const allUsersDetail = await User.find({}).select(excludedFields);
        console.log('allUsersDetail ====> ', allUsersDetail);

        return NextResponse.json({
            mesaaage: "All User details",
            data: allUsersDetail
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}