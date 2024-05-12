// Load dotenv
import dotenv from 'dotenv';
dotenv.config();

// Load database
import "./shared/infra/database/mongo";

// Infra
import "./shared/infra/http/app";