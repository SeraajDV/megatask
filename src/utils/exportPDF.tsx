import {
  Document,
  Page,
  PDFDownloadLink,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { ActivitySession } from "../types";
import { formatDuration } from "./formatDuration";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderColor: "#3B82F6",
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 20,
  },
  summarySection: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#F3F4F6",
    borderRadius: 4,
  },
  summaryRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 10,
    color: "#6B7280",
    fontWeight: "bold",
  },
  summaryValue: {
    fontSize: 12,
    color: "#1F2937",
    fontWeight: "bold",
  },
  sessionsHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#1F2937",
  },
  sessionItem: {
    marginBottom: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 4,
  },
  sessionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 3,
  },
  sessionTime: {
    fontSize: 10,
    color: "#6B7280",
    marginBottom: 3,
  },
  sessionDuration: {
    fontSize: 11,
    color: "#3B82F6",
    fontWeight: "bold",
  },
});

type ActivityPDFProps = {
  sessions: ActivitySession[];
  totalTracked: number;
  todayTracked: number;
};

function ActivityPDF({
  sessions,
  totalTracked,
  todayTracked,
}: ActivityPDFProps) {
  return (
    <Document>
      <Page
        size="A4"
        style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Megatask Activity Report</Text>
          <Text style={styles.subtitle}>
            Generated on{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>

        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Tracked Time:</Text>
            <Text style={styles.summaryValue}>
              {formatDuration(totalTracked)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Today's Time:</Text>
            <Text style={styles.summaryValue}>
              {formatDuration(todayTracked)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Sessions:</Text>
            <Text style={styles.summaryValue}>{sessions.length}</Text>
          </View>
        </View>

        <Text style={styles.sessionsHeader}>Activity Sessions</Text>

        {sessions.map((session) => (
          <View
            key={session.id}
            style={styles.sessionItem}>
            <Text style={styles.sessionTitle}>{session.title}</Text>
            <Text style={styles.sessionTime}>
              {new Date(session.startAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}{" "}
              {new Date(session.startAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {new Date(session.endAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            <Text style={styles.sessionDuration}>
              Duration: {formatDuration(session.durationSeconds)}
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}

type ExportPDFButtonProps = {
  sessions: ActivitySession[];
  totalTracked: number;
  todayTracked: number;
};

export function ExportPDFButton({
  sessions,
  totalTracked,
  todayTracked,
}: ExportPDFButtonProps) {
  if (sessions.length === 0) {
    return null;
  }

  return (
    <PDFDownloadLink
      document={
        <ActivityPDF
          sessions={sessions}
          totalTracked={totalTracked}
          todayTracked={todayTracked}
        />
      }
      fileName={`megatask-activity-${new Date().toISOString().split("T")[0]}.pdf`}>
      {({ loading }) => (
        <button
          type="button"
          disabled={loading}
          className="h-10 rounded-lg border border-border/50 bg-secondary px-4 text-sm font-medium transition hover:bg-accent disabled:opacity-50">
          {loading ? "Generating PDF..." : "Export to PDF"}
        </button>
      )}
    </PDFDownloadLink>
  );
}
